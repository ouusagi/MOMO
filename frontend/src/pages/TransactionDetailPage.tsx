import { useNavigate, useParams } from "react-router-dom"
import Button from "../components/common/Button"
import { categoryIcons } from "../constants/categoryIcons"
import { useDeleteExpense, useGetExpenses, useUpdateExpense } from "../hooks/useExpense"
import ConfirmModal from "../components/common/ConfirmModal"
import { useState } from "react"
import toast from "react-hot-toast"
import EditModal from "../components/common/EditModal"
import { useTranslation } from "react-i18next"
import { consumptionTypeIcons, consumptionEmotionIcons} from "../constants/consumption"
import type { ConsumptionType, ConsumptionEmotion } from '../types/expense'


// icons
import { detailIcons } from "../constants/detailIcons"




const TransactionDetailPage = () => {
    
    const { data:ExpensesData, isLoading:ExpensesLoading, error:ExpensesError } = useGetExpenses()
    const { id } = useParams()
    const navigate = useNavigate()
    const filterExpenses = ExpensesData?.find(item => item.id === Number(id))
    const [modalOpen, setModalOpen] = useState(false)
    const [editModalOpen, setEditModalOpen] = useState(false)
    const { mutate:deleteExpense } = useDeleteExpense()
    const { mutate:updateExpense } = useUpdateExpense()
    const { t } = useTranslation()

    const handleDelete = () => {
        if (!filterExpenses) return
        deleteExpense(filterExpenses.id, {
            onSuccess:() => {toast.success(t('transactionDetail.deleteSuccess')); navigate('/transactions')},
            onError:() => {toast.error(t('transactionDetail.loadError'))},
        })}

    const handleUpdate = (data: { 
        title: string; 
        amount: number; 
        memo: string; 
        expenseDate:string;
        consumptionType?: ConsumptionType;
        consumptionEmotion?: ConsumptionEmotion;
        }) => {
        if (!filterExpenses) return
        updateExpense({
            id:Number(id), 
            data:{title:data.title, 
                  amount:data.amount, 
                  memo:data.memo, 
                  expenseDate:data.expenseDate, 
                  category:filterExpenses.category,
                  consumptionType: data.consumptionType,
                  consumptionEmotion: data.consumptionEmotion,
                }},{
        onSuccess:()=>{toast.success(t('transactionDetail.updateSuccess')); navigate('/transactions')},
        onError:(error)=>{console.error("지출 수정 실패:", error); toast.error(t('transactionDetail.loadError'))}
        })}

    const consumptionType = filterExpenses?.consumptionType
    const consumptionEmotion = filterExpenses?.consumptionEmotion

    const typeIcon = consumptionType ? consumptionTypeIcons[consumptionType] : undefined
    const emotionIcon = consumptionEmotion ? consumptionEmotionIcons[consumptionEmotion] : undefined
    if(ExpensesLoading) return <p>{t('transactionDetail.loading')}</p>
    if(ExpensesError) return <p>{t('transactionDetail.loadError')}</p>
    if(!filterExpenses) return <p>{t('transactionDetail.notFound')}</p>
    

    return(
        <div className='w-full min-h-screen bg-[#FFC4B3] flex flex-col pb-40'>

            {/* header */}
            <div className='flex items-center justify-between px-6 pt-20 pb-4'>
                <Button className="" variant='back' onClick={() => navigate(-1)}>←</Button>
                <span className='text-[#3D2C2C] font-bold'>{t('transactionDetail.title')}</span>
                <button onClick={()=> navigate('/transactions')} className='font-bold cursor-pointer text-[#F47560]'>{t('transactionDetail.complete')}</button>
            </div>

            {/* category + expense */}
            <div className='flex flex-col gap-4 px-6'>
                <div className='bg-white bg-opacity-65 rounded-3xl py-6 flex flex-col items-center gap-2 shadow-sm' onClick={()=> setEditModalOpen(true)}>
                    <span className="bg-[#FFD9CE] py-4 px-4 rounded-2xl"><img src={categoryIcons[filterExpenses?.category] || '💰'} alt="icon-img" width={23}/></span>
                    <span className='text-[#7A5555] text-sm bg-[#FFD9CE] py-1 px-4 rounded-3xl font-bold'>{filterExpenses?.title}</span>
                    <span className='text-[#F47560] font-bold text-2xl'>{filterExpenses?.amount.toLocaleString()}{t('signup.currency')}</span>
                    <span className='text-[#B89090] text-sm'>{filterExpenses?.expenseDate.slice(0,10)}</span>
                </div>

                <div className="flex items-center gap-2">
                    <img src={consumptionTypeIcons.necessary} width={20} height={20} />
                    <p className='text-[#7A5555] font-bold'>{t('transactionDetail.detailHistory')}</p>
                    <div className="flex-1 h-px bg-[#F4A99C] ml-10" />
                </div>
            </div>

            {/* Detail */}
            <div className="flex-1 flex flex-col gap-4 px-6">
                <div className='bg-white bg-opacity-65 rounded-3xl p-6 flex flex-col gap-4 mt-4' onClick={()=> setEditModalOpen(true)}>
                
                {/* Consumption Emotion */}
                {consumptionEmotion && (
                    <div className="flex items-center justify-between gap-3">

                        <div className="flex items-center gap-3">
                            <div className="w-11 h-11 bg-[#FFE2DE] rounded-full flex items-center justify-center">
                                {emotionIcon && (<img src={emotionIcon} className="w-6 h-6 object-contain"/>)}
                            </div>

                            <span className="text-[#7A5555] font-bold text-sm">
                                {t('enterDirectly.consumptionEmotionTitle')}
                            </span>
                        </div>

                        <span className="bg-[#FFE2DE] text-[#F47560] px-4 py-2 rounded-full text-sm font-bold">
                            {t(`enterDirectly.consumptionEmotions.${consumptionEmotion}`)}
                        </span>
                    </div>
                )}

                {/* Consumption Type */}
                {consumptionType && (
                    <div className="flex items-center justify-between gap-3">

                        <div className="flex items-center gap-3">
                            <div className="w-11 h-11 bg-[#E5F0FA] rounded-full flex items-center justify-center">
                                {typeIcon && (<img src={typeIcon} className="w-6 h-6 object-contain"/>)}
                            </div>

                            <span className="text-[#7A5555] font-bold text-sm">
                                {t('enterDirectly.consumptionTypeTitle')}
                            </span>
                        </div>

                        <span className="bg-[#E5F0FA] text-[#478DB8] px-4 py-2 rounded-full text-sm font-bold">
                            {t(`enterDirectly.consumptionTypes.${consumptionType}`)}
                        </span>
                    </div>
                )}

                {(consumptionType || consumptionEmotion) && (<div className="h-px bg-[#FFD9CE]" />)}

                    <div className='flex justify-between items-center'>
                        <div className="flex items-center gap-3">
                          <img src={detailIcons.store} className="w-4 h-4 opacity-90" />
                          <span className='text-[#B89090] font-bold text-sm'>{t('transactionDetail.shopName')}</span>
                        </div>
                        <span className='text-[#7A5555] font-bold text-sm'>{filterExpenses?.title}</span>
                    </div>

                    <div className='flex justify-between items-center'>
                        <div className="flex items-center gap-3">
                          <img src={detailIcons.category} className="w-4 h-4 opacity-90" />
                          <span className='text-[#B89090] font-bold text-sm'>{t('transactionDetail.category')}</span>
                        </div>
                        <span className='text-[#7A5555] font-bold text-sm'>{t(`main.categories.${filterExpenses?.category}`)}</span>
                    </div>

                    <div className='flex justify-between items-center'>
                        <div className="flex items-center gap-3">
                          <img src={detailIcons.date} className="w-4 h-4 opacity-90" />
                          <span className='text-[#B89090] font-bold text-sm'>{t('transactionDetail.date')}</span>
                        </div>
                        <span className='text-[#7A5555] font-bold text-sm'>{filterExpenses?.expenseDate.slice(0,10)}</span>
                    </div>

                    <div className='flex justify-between items-center gap-24'>
                        <div className="flex items-center gap-3">
                          <img src={detailIcons.memo} className="w-4 h-4 opacity-90" />
                          <span className='text-[#B89090] font-bold text-sm whitespace-nowrap'>{t('transactionDetail.memo')}</span>
                        </div>
                        <span className='text-[#7A5555] font-bold text-sm min-w-0 flex-1 text-right whitespace-normal break-words'>{filterExpenses?.memo}</span>
                    </div>
                </div>

                {/* button */}
                <div className='flex gap-3 mt-auto pb-20'>
                    <Button variant='outline' fullWidth onClick={() => setEditModalOpen(true)}>{t('transactionDetail.editButton')}</Button>
                    <Button variant='primary' fullWidth onClick={() => setModalOpen(true)}>{t('transactionDetail.deleteButton')}</Button>
                </div>
            </div>

            <ConfirmModal isOpen={modalOpen} title={t('transactionDetail.deleteConfirmTitle')} message={t('transactionDetail.deleteConfirmMessage')} icon="🗑️" onConfirm={handleDelete} onCancel={() => setModalOpen(false)}/>
            
            <EditModal 
            isOpen={editModalOpen} 
            onClose={()=> setEditModalOpen(false)} 
            onSave={handleUpdate} 
            initialData={{title:filterExpenses.title, 
                          amount:filterExpenses.amount, 
                          memo:filterExpenses.memo ?? '', 
                          date:filterExpenses.expenseDate,
                          consumptionType: filterExpenses.consumptionType,
                          consumptionEmotion: filterExpenses.consumptionEmotion}}>
            </EditModal>

        </div>
        
    )
}

export default TransactionDetailPage