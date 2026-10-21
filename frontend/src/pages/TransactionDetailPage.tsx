import { useNavigate, useParams } from "react-router-dom"
import Button from "../components/common/Button"
import { categoryIcons } from "../constants/categoryIcons"
import { useDeleteExpense, useGetExpenses, useUpdateExpense } from "../hooks/useExpense"
import ConfirmModal from "../components/common/ConfirmModal"
import { useState } from "react"
import toast from "react-hot-toast"
import EditModal from "../components/common/EditModal"
import { useTranslation } from "react-i18next"




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
        deleteExpense(filterExpenses?.id, {
            onSuccess:() => {toast.success(t('transactionDetail.deleteSuccess')); navigate('/transactions')},
            onError:() => {toast.error(t('transactionDetail.loadError'))},
        })}

    const handleUpdate = (data: { title: string; amount: number; memo: string; expenseDate:string; }) => {
        updateExpense({id:Number(id), data:{title:data?.title, amount:data?.amount, memo:data?.memo, expenseDate:data?.expenseDate, category:filterExpenses?.category}},{
        onSuccess:()=>{toast.success(t('transactionDetail.updateSuccess')); navigate('/transactions')},
        onError:()=>{toast.error(t('transactionDetail.loadError'))}
        })}


    if(ExpensesLoading) return <p>{t('transactionDetail.loading')}</p>
    if(ExpensesError) return <p>{t('transactionDetail.loadError')}</p>
    if(!filterExpenses) return <p>{t('transactionDetail.notFound')}</p>
    

    return(
        <div className='w-full min-h-screen bg-[#FFC4B3] flex flex-col'>

            {/* header */}
            <div className='flex items-center justify-between px-6 pt-12 pb-4'>
                <Button className="" variant='back' onClick={() => navigate(-1)}>←</Button>
                <span className='text-[#3D2C2C] font-bold'>{t('transactionDetail.title')}</span>
                <button onClick={()=> navigate('/transactions')} className='font-bold cursor-pointer text-[#F47560]'>{t('transactionDetail.complete')}</button>
            </div>

            {/* category + expense */}
            <div className='flex flex-col gap-4 px-6'>
                <div className='bg-white bg-opacity-65 rounded-3xl py-6 flex flex-col items-center gap-2' onClick={()=> setEditModalOpen(true)}>
                    <span className="bg-[#FFD9CE] py-4 px-4 rounded-2xl"><img src={categoryIcons[filterExpenses?.category] || '💰'} alt="icon-img" width={23}/></span>
                    <span className='text-[#7A5555] text-sm bg-[#FFD9CE] py-1 px-4 rounded-3xl font-bold'>{filterExpenses?.title}</span>
                    <span className='text-[#F47560] font-bold text-2xl'>{filterExpenses?.amount.toLocaleString()}{t('signup.currency')}</span>
                </div>

                <div>
                    <p className='text-[#7A5555] font-bold'>{t('transactionDetail.detailHistory')}</p>
                </div>
            </div>

            {/* Detail */}
            <div className="flex-1 flex flex-col gap-4 px-6">
                <div className='bg-white bg-opacity-65 rounded-3xl p-6 flex flex-col gap-4 mt-4' onClick={()=> setEditModalOpen(true)}>
                    <div className='flex justify-between items-center border-b border-[#FFD9CE]'>
                        <span className='text-[#B89090] font-bold text-sm'>{t('transactionDetail.shopName')}</span>
                        <span className='text-[#3D2C2C] font-bold text-sm'>{filterExpenses?.title}</span>
                    </div>

                    <div className='flex justify-between items-center border-b border-[#FFD9CE]'>
                        <span className='text-[#B89090] font-bold text-sm'>{t('transactionDetail.category')}</span>
                        <span className='text-[#3D2C2C] font-bold text-sm'>{t(`main.categories.${filterExpenses?.category}`)}</span>
                    </div>

                    <div className='flex justify-between items-center border-b border-[#FFD9CE]'>
                        <span className='text-[#B89090] font-bold text-sm'>{t('transactionDetail.date')}</span>
                        <span className='text-[#3D2C2C] font-bold text-sm'>{filterExpenses?.expenseDate.slice(0,10)}</span>
                    </div>

                    <div className='flex justify-between items-center border-b border-[#FFD9CE] gap-24'>
                        <span className='text-[#B89090] font-bold text-sm whitespace-nowrap'>{t('transactionDetail.memo')}</span>
                        <span className='text-[#3D2C2C] font-bold text-sm'>{filterExpenses?.memo}</span>
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
            initialData={{title:filterExpenses?.title, amount:filterExpenses?.amount, memo:filterExpenses?.memo, date:filterExpenses?.expenseDate}}>
            </EditModal>

        </div>
        
    )
}

export default TransactionDetailPage