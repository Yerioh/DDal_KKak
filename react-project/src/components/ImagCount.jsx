import { useState } from 'react'
import ToggleButton from 'react-bootstrap/ToggleButton'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'

function ImageCreateButton() {
  const handleCheckboxChange = () => {
    const [ischecked, setIscheced] = useState('false')
  }
  return (
    <ToggleButtonGroup
      type="radio"
      name="options"
      defaultValue={{ width: '1024', height: '1024' }}
    >
      <ToggleButton
        id="imagesize-radio-1"
        value={{ width: '1024', height: '1024' }}
      >
        1024x1024
      </ToggleButton>
      <ToggleButton
        id="imagesize-radio-2"
        value={{ width: '1280', height: '768' }}
      >
        1280x768
      </ToggleButton>
      <ToggleButton
        id="imagesize-radio-3"
        value={{ width: '768', height: '1280' }}
      >
        768x1280
      </ToggleButton>
      <ToggleButton
        id="imagesize-radio-4"
        value={{ width: '2048', height: '2048' }}
      >
        2048x2048
      </ToggleButton>
      <ToggleButton
        id="imagesize-radio-5"
        value={{ width: '2048', height: '1536' }}
      >
        2048x1536
      </ToggleButton>
    </ToggleButtonGroup>
  )
}

export default ImageCreateButton
