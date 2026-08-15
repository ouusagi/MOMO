import { useNavigate, useParams } from "react-router-dom"
import Button from "../components/common/Button"
import { categoryEmoji } from "../constants/categoryEmoji"
import { useDeleteExpense, useGetExpenses, useUpdateExpense } from "../hooks/useExpense"
import ConfirmModal from "../components/common/ConfirmModal"
import { useState } from "react"
import toast from "react-hot-toast"
import EditModal from "../components/common/EditModal"




const TransactionDetailPage = () => {
    
    const { data:ExpensesData, isLoading:ExpensesLoading, error:ExpensesError } = useGetExpenses()
    const { id } = useParams()
    const navigate = useNavigate()
    const filterExpenses = ExpensesData?.find(item => item.id === Number(id))
    const [modalOpen, setModalOpen] = useState(false)
    const [editModalOpen, setEditModalOpen] = useState(false)
    const { mutate:deleteExpense } = useDeleteExpense()
    const { mutate:updateExpense } = useUpdateExpense()

    const handleDelete = () => {
        deleteExpense(filterExpenses?.id, {
            onSuccess:() => {toast.success("削除が完了しました。"); navigate('/transactions')},
            onError:() => {toast.error("エラーが発生しました")},
        })}

    const handleUpdate = (data: { title: string; amount: number; memo: string; expenseDate:string; }) => {
        updateExpense({id:Number(id), data:{title:data?.title, amount:data?.amount, memo:data?.memo, expenseDate:data?.expenseDate, category:filterExpenses?.category}},{
        onSuccess:()=>{toast.success("支出を更新しました。"); navigate('/transactions')},
        onError:()=>{toast.error("エラーが発生しました")}
        })}


    if(ExpensesLoading) return <p>読み込み中...</p>
    if(ExpensesError) return <p>エラーが発生しました。</p>
    if(!filterExpenses) return <p>支出情報が見つかりません。</p>
    

    return(
        <div className='w-full min-h-screen bg-[#FFC4B3] flex flex-col'>

            {/* header */}
            <div className='flex items-center justify-between px-6 pt-12 pb-4'>
                <Button className="" variant='back' onClick={() => navigate(-1)}>←</Button>
                <span className='text-[#3D2C2C] font-bold'>支出詳細</span>
                <button onClick={()=> navigate('/transactions')} className='font-bold cursor-pointer text-[#F47560]'>完了</button>
            </div>

            {/* category + expense */}
            <div className='flex flex-col gap-4 px-6'>
                <div className='bg-white bg-opacity-65 rounded-3xl py-6 flex flex-col items-center gap-2' onClick={()=> setEditModalOpen(true)}>
                    <span className='text-2xl bg-[#FFD9CE] py-3 px-4 rounded-2xl'>{categoryEmoji[filterExpenses?.category] || '💰'}</span>
                    <span className='text-[#7A5555] text-sm bg-[#FFD9CE] py-1 px-4 rounded-3xl font-bold'>{filterExpenses?.category}</span>
                    <span className='text-[#F47560] font-bold text-2xl'>{filterExpenses?.amount.toLocaleString()}円</span>
                </div>

                <div>
                    <p className='text-[#7A5555] font-bold'>詳細履歴</p>
                </div>
            </div>

            {/* Detail */}
            <div className="flex-1 flex flex-col gap-4 px-6">
                <div className='bg-white bg-opacity-65 rounded-3xl p-6 flex flex-col gap-4 mt-4' onClick={()=> setEditModalOpen(true)}>
                    <div className='flex justify-between items-center border-b border-[#FFD9CE]'>
                        <span className='text-[#B89090] font-bold text-sm'>店名</span>
                        <span className='text-[#3D2C2C] font-bold text-sm'>{filterExpenses?.title}</span>
                    </div>

                    <div className='flex justify-between items-center border-b border-[#FFD9CE]'>
                        <span className='text-[#B89090] font-bold text-sm'>カテゴリー</span>
                        <span className='text-[#3D2C2C] font-bold text-sm'>{filterExpenses?.category}</span>
                    </div>

                    <div className='flex justify-between items-center border-b border-[#FFD9CE]'>
                        <span className='text-[#B89090] font-bold text-sm'>日付</span>
                        <span className='text-[#3D2C2C] font-bold text-sm'>{filterExpenses?.expenseDate.slice(0,10)}</span>
                    </div>

                    <div className='flex justify-between items-center border-b border-[#FFD9CE] gap-24'>
                        <span className='text-[#B89090] font-bold text-sm whitespace-nowrap'>メモ</span>
                        <span className='text-[#3D2C2C] font-bold text-sm'>{filterExpenses?.memo}</span>
                    </div>
                </div>

                {/* button */}
                <div className='flex gap-3 mt-auto pb-20'>
                    <Button variant='outline' fullWidth onClick={() => setEditModalOpen(true)}>✏️ 修正</Button>
                    <Button variant='primary' fullWidth onClick={() => setModalOpen(true)}>🗑 削除</Button>
                </div>
            </div>

            <ConfirmModal isOpen={modalOpen} title='支出を削除しますか？' message='削除した支出は元に戻せません' onConfirm={handleDelete} onCancel={() => setModalOpen(false)}/>
            
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