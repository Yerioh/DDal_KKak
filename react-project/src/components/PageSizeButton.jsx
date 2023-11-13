import ToggleButton from 'react-bootstrap/ToggleButton'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'

function ImageOptButton() {
  return (
    <div>
      <h2>페이지 크기를 선택해주세요!</h2>
      <ToggleButtonGroup
        variant= 'info'
        type="radio"
        name="options"
        style={{'gap':'5%', 'margin-bottom':'15%'}}
      >
        <ToggleButton
          id="imagesize-radio-1"
          value={{ width: '1024', height: '1024' }}
          variant= 'info'
          className='btnmy'
        >
          1024x1024
        </ToggleButton>
        <ToggleButton
          id="imagesize-radio-2"
          value={{ width: '1280', height: '768' }}
          variant= 'info'
          className='btnmy'
        >
          1280x768
        </ToggleButton>
        <ToggleButton
          id="imagesize-radio-3"
          value={{ width: '768', height: '1280' }}
          variant= 'info'
          className='btnmy'
        >
          768x1280
        </ToggleButton>
        <ToggleButton
          id="imagesize-radio-4"
          value={{ width: '2048', height: '2048' }}
          variant= 'info'
          className='btnmy'
        >
          2048x2048
        </ToggleButton>
        <ToggleButton
          id="imagesize-radio-5"
          value={{ width: '2048', height: '1536' }}
          variant= 'info'
          className='btnmy'
        >
          2048x1536
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  )
}

export default ImageOptButton
