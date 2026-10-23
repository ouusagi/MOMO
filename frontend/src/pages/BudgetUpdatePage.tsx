import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useGetUser, useUpdateBudGet } from "../hooks/useUser"
import Button from "../components/common/Button"
import toast from "react-hot-toast"
import NavBottom from "../components/common/NavBottom"
import { useTranslation } from "react-i18next"


const BudgetUpdatePage = () => {

    const navigate = useNavigate()
    const { t } = useTranslation()
    const { data: UserData, isLoading, error } = useGetUser()
    const { mutate: updateBudget } = useUpdateBudGet()
    const [budget, setBudget] = useState("")

    // 예산 입력
    const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/[^0-9]/g, "")
        setBudget(value)
    }

    // 예산 변경
    const handleUpdateBudget = () => {

        if (!budget) {
            toast.error(t('budgetUpdatePage.budgetPlaceholder'))
            return
        }

        const budgetNumber = Number(budget)

        if (budgetNumber <= 0) {
            toast.error(t('budgetUpdatePage.minimumError'))
            return
        }

        updateBudget(budgetNumber,{
            onSuccess: () => {
                toast.success(t('budgetUpdatePage.updateSuccess'))
                navigate('/mypage')
            },

            onError: () => {
                toast.error(t('budgetUpdatePage.updateFailure'))
            },
        })
    }


    if (isLoading) {
        return <p className="text-center">{t('budgetUpdatePage.loading')}</p>
    }

    if (error) {
        return <p className="text-center">{t('budgetUpdatePage.error')}</p>
    }

    if (!UserData) {
        return <p className="text-center">{t('budgetUpdatePage.userNotFound')}</p>
    }


    return(
        <div className="w-full min-h-screen bg-gradient-to-b from-[#FFC3B6] to-[#F8A1A1CC] flex flex-col pb-36">

            {/* Header */}
            <div className="flex items-center justify-between px-6 pt-20 pb-4">
                <Button variant="back" onClick={() => navigate(-1)}>←</Button>
                <span className="text-[#3D2C2C] font-bold">{t('budgetUpdatePage.title')}</span>
                <div className="w-10"></div>
            </div>


            <div className="flex flex-col px-6">

                {/* Title */}
                <div className="mt-6">
                    <p className="text-[#3D2C2C] text-xl font-bold">{t('budgetUpdatePage.pageTitle')}</p>
                    <p className="text-[#B89090] text-sm mt-1">{t('budgetUpdatePage.pageDescription')}</p>
                </div>


                {/* Budget Input */}
                <div className="bg-white bg-opacity-65 rounded-2xl p-4 mt-6">

                    <p className="text-[#B89090] text-xs mb-2">{t('budgetUpdatePage.budgetLabel')}</p>

                    <div className="relative flex items-center">
                        <span className="absolute left-4 text-[#3D2C2C] text-xl font-bold">{t('myPage.currency')}</span>

                    <input id="budget" type="text" inputMode="numeric" value={budget ? Number(budget).toLocaleString() : ""} autoComplete="off" onChange={handleBudgetChange}
                        placeholder={UserData.budget.toLocaleString()}
                        className="w-full py-4 pl-9 pr-12 rounded-2xl border-2 border-[#E8D5D1] bg-white bg-opacity-50 text-[#3D2C2C] font-bold outline-none 
                                 focus:border-[#A98274] transition-colors"
                    />

                        {budget && (
                            <button type="button" onClick={() => setBudget("")}
                                className="absolute right-4 w-6 h-6 bg-[#B89090] bg-opacity-60 rounded-full flex items-center justify-center text-white text-xs"
                            >
                                ×
                            </button>
                        )}
                    </div>

                </div>


                {/* Current Budget */}
                <div className="bg-white bg-opacity-65 rounded-2xl px-4 py-4 mt-3 flex items-center justify-between">
                    <span className="text-[#B89090] text-sm">{t('budgetUpdatePage.currentBudget')}</span>
                    <span className="text-[#F47560] font-bold">{t('myPage.currency')}{UserData.budget.toLocaleString()}</span>
                </div>


                {/* Update Button */}
                <button type="button" onClick={handleUpdateBudget}
                    className="w-full bg-[#F47560] rounded-2xl py-4 mt-6 text-white font-bold active:scale-[0.98] transition-transform"
                >
                    {t('budgetUpdatePage.updateButton')}
                </button>


                {/* Info */}
                <p className="text-[#B89090] text-xs mt-4 text-center">{t('budgetUpdatePage.info')}</p>

            </div>

            {/* BottomNav */}
            <div className="fixed bottom-0 left-0 right-0">
                <NavBottom />
            </div>

        </div>
    )
}

export default BudgetUpdatePage