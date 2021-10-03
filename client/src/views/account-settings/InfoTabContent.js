import { Fragment, useState } from 'react'
import classnames from 'classnames'
import Flatpickr from 'react-flatpickr'
import { useForm, Controller } from 'react-hook-form'
import { Label, Input,  Media, FormGroup, Row, Col, Button, Form } from 'reactstrap'

import '@styles/react/libs/flatpickr/flatpickr.scss'

const InfoTabContent = () => {
  const { register, errors, handleSubmit, control, trigger } = useForm({
    defaultValues: new Date() 
  })

  const [avatar, setAvatar] = useState('https://p.kindpng.com/picc/s/78-786416_flat-design-png-avatar-transparent-png.png')
  const onChange = e => {
    const reader = new FileReader(),
      files = e.target.files
    reader.onload = function () {
      setAvatar(reader.result)
    }
    reader.readAsDataURL(files[0])
  }
  const onSubmit = data => trigger()

  return (
<>
    <Media>
    <Media className='mr-25' left>
      <Media object className='rounded mr-50' src={avatar} alt='Generic placeholder image' height='80' width='80' />
    </Media>
    <Media className='mt-75 ml-1' body>
      <Button.Ripple tag={Label} className='mr-75' size='sm' color='primary'>
        Upload
        <Input type='file' onChange={onChange} hidden accept='image/*' />
      </Button.Ripple>
      <Button.Ripple color='secondary' size='sm' outline>
        Reset
      </Button.Ripple>
      <p>School Logo</p>
    </Media>
  </Media>
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Row>
      <Col sm='12'>
            <FormGroup>
              <Label for='username'>School Name</Label>
              <Controller
                // defaultValue={data.username}
                control={control}
                as={Input}
                id='username'
                name='username'
                placeholder='School Name'
                innerRef={register({ required: true })}
                onChange={e => setValue('username', e.target.value)}
                className={classnames({
                  'is-invalid': errors.username
                })}
              />
            </FormGroup>
          </Col>
         
        <Col sm='6'>
          <FormGroup>
            <Label for='birth-date'>Address</Label>
            <Controller
              name='dob'
              as={Flatpickr}
              id='birth-date'
              control={control}
              placeholder='Address'
              className={classnames('form-control', {
                'is-invalid': errors.dob
              })}
            />
          </FormGroup>
        </Col>
        <Col sm='6'>
          <FormGroup>
            <Label for='country'>Country</Label>
            <Input
              id='country'
              type='select'
              name='country'
              // defaultValue={data.country || ''}
              className={classnames({
                'is-invalid': errors.country
              })}
              innerRef={register({ required: true })}
            >
              <option value='USA'>USA</option>
              <option value='France'>France</option>
              <option value='Canada'>Canada</option>
            </Input>
          </FormGroup>
        </Col>
        <Col sm='6'>
          <FormGroup>
            <Label for='website'> School Website</Label>
            <Input
              type='url'
              id='website'
              name='website'
              // defaultValue={data.website || ''}
              placeholder='Website Address'
              className={classnames({
                'is-invalid': errors.website
              })}
              innerRef={register({ required: true })}
            />
          </FormGroup>
        </Col>
        <Col sm='6'>
          <FormGroup>
            <Label for='phone'>Phone</Label>
            <Input
              id='phone'
              name='phone'
              // defaultValue={data.phone || ''}
              placeholder='Phone Number'
              className={classnames({
                'is-invalid': errors.phone
              })}
              innerRef={register({ required: true })}
            />
          </FormGroup>
        </Col>
        <Col className='mt-1' sm='12'>
          <Button.Ripple className='mr-1' color='primary'>
            Save changes
          </Button.Ripple>
          <Button.Ripple color='secondary' outline>
            Cancel
          </Button.Ripple>
        </Col>
      </Row>
    </Form>
    </>
  )
}

export default InfoTabContent
