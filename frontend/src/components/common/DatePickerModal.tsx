import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./DatePickerModal.css"
import { ja } from "date-fns/locale";


interface DatePickerModalProps {
  open: boolean;
  selectedDate: Date;
  onChange: (date: Date) => void;
  onClick: () => void;
}

const DatePickerModal = ({ open, selectedDate, onChange, onClick,}: DatePickerModalProps) => {
  if (!open) return null;

  return (
    <>
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="w-[340px] rounded-3xl bg-[#FFE6DE] p-6 shadow-2xl">
                <h2 className="text-center text-xl font-bold text-[#3D2C2C] mb-4">日付を選択</h2>
                <div className="flex justify-center">
                <DatePicker locale={ja} inline selected={selectedDate} onChange={(date) => { if (!date) return; onChange(date);}}/>
                </div>
                <div className="flex gap-3 mt-6">
                    <button className="flex-1 rounded-2xl bg-white py-3 font-bold text-[#3D2C2C]" onClick={onClick}>キャンセル</button>
                    <button className="flex-1 rounded-2xl bg-[#F47560] py-3 font-bold text-white" onClick={onClick}>決定</button>
                </div>
            </div>
        </div>
    </>
  );
};

export default DatePickerModal;