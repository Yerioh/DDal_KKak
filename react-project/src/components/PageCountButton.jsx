const PageCountButton = ({setCountImg}) => {

  const countSelect = (e)=>{
    setCountImg(e.target.value)
  }

  return (
    <div>
      <h2>출력할 사진 갯수를 선택해주세요!</h2>
      <p>*개수를 많이 생성할 수록 이미지가 만들어지는 데 시간이 더 소모됩니다.</p>
      <select defaultValue='이미지생성' name='페이지개수' className='pageCountOption' onChange={countSelect} >생성이미지 개수
        <option value='0' selected disabled hidden >이미지생성</option>
        <option value='1'>1</option>
        <option value='2'>2</option>
        <option value='3'>3</option>
        <option value='4'>4</option>
        <option value='5'>5</option>
      </select>
    </div>
  )
}

export default PageCountButton
