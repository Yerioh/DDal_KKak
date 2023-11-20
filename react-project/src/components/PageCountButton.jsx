const PageCountButton = ({ handleImageCountChange }) => {
  //CreateImage에게 페이지 개수에 대한 정보 전달
  const handleCountChange = (e) => {
    const count = parseInt(e.target.value);
    handleImageCountChange(count);
    console.log(count);
  };
  return (
    <div className="pagecountbutton">
      <div className="counthead">
        <h3 style={{width:'90%',height:'10%'}}>사진 개수</h3>
        <select
          name="페이지개수"
          className="pageCountOption"
          onChange={handleCountChange}
        >
          생성이미지 개수
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>
      <p>
        *개수를 많이 생성할 수록 이미지가 만들어지는 데 시간이 더 소모됩니다.
      </p>
    </div>
  );
};

export default PageCountButton;
