import { useNavigate } from 'react-router-dom'
import './App.css'
import Button from './components/common/Button'
import Card from './components/common/Card'
import Input from './components/common/Input'
import NavBottom from './components/common/NavBottom'
import CategoryIcon from './components/common/CategoryIcon'
import { useState } from 'react'





function App() {

  {/* UI확인 테스트용 - 페이지 구현시 수정 후 사용 */}
  // const navigate = useNavigate()
  // const [activeIcon, setactiveIcon] = useState('')
  

  return (
    <div className='p-8 flex flex-col gap-4 bg-[#FFC4B3]'>
      {/* UI확인 테스트용 - 페이지 구현시 수정 후 사용 */}
      {/* <Button variant='primary' className='w-[350px] h-[58px]'>次へ→</Button>
      <Button variant='outline' className='w-[350px] h-[58px]' type='submit'>メイン画面へ移動</Button>
      <Button variant='back' className='w-[38px] h-[38px]'>←</Button>

      <Input type='email' className='w-[350px] h-[58px]' placeholder='内容を入力してください' label='ユーザーID' value='' onChange={(e)=> e.target.value}></Input>
      <Input type='password' className='w-[350px] h-[58px]' placeholder='内容を入力してください' label='パスワード' value='' onChange={(e)=> e.target.value}></Input>
      <Input type='password' className='w-[350px] h-[58px]' placeholder='内容を入力してください' label='パスワード再入力' value='' onChange={(e)=> e.target.value}></Input>

      <NavBottom></NavBottom>

      <Card onClick={()=> navigate('/detail')} emoji={'☕'} title='スターバックス' time={"15:00"} amount={700}></Card>
      <Card onClick={()=> navigate('/detail')} emoji={'🛍'} title='マツモトキヨシ' time={"16:40"} amount={1320}></Card>

      <div className='flex gap-5'>
      <CategoryIcon emoji='🍔' label='食費' amount={1890} onClick={()=> navigate('/detail')} ></CategoryIcon>
      <CategoryIcon emoji='☕' label='カフェ' onClick={()=> navigate('/detail')} amount={1700}></CategoryIcon>
      <CategoryIcon emoji='🚇' label='交通' onClick={()=> navigate('/detail')} amount={31700}></CategoryIcon>
      <CategoryIcon emoji='➕' label='もっと見る' onClick={()=> navigate('/detail')} ></CategoryIcon>
      </div>

      <div className='flex gap-5'>
      <CategoryIcon emoji='☕' label='カフェ' active={activeIcon === 'カフェ'} onClick={()=> setactiveIcon('カフェ')}></CategoryIcon>
      <CategoryIcon emoji='🍔' label='食費' active={activeIcon === '食費'} onClick={()=> setactiveIcon('食費')}></CategoryIcon>
      <CategoryIcon emoji='🛍' label='ショッピング' active={activeIcon === 'ショッピング'} onClick={()=> setactiveIcon('ショッピング')}></CategoryIcon>
      <CategoryIcon emoji='🚇' label='交通' active={activeIcon === '交通'} onClick={()=> setactiveIcon('交通')}></CategoryIcon>
      <CategoryIcon emoji='🏠' label='家賃' active={activeIcon === '家賃'} onClick={()=> setactiveIcon('家賃')}></CategoryIcon>
      <CategoryIcon emoji='💊' label='医薬品' active={activeIcon === '医薬品'} onClick={()=> setactiveIcon('医薬品')}></CategoryIcon>
      <CategoryIcon emoji='🎮' label='趣味' active={activeIcon === '趣味'} onClick={()=> setactiveIcon('趣味')}></CategoryIcon>
      <CategoryIcon emoji='＋' label='追加' onClick={()=> navigate('/add')}></CategoryIcon>
      </div> */}

    </div>
  )
}

export default App
