import React from 'react';
import { Form, Input, Button, Checkbox, message } from 'antd';
import css from 'styled-jsx/css'
import Axios from 'axios';

const FormItem = Form.Item;

class MedicalCheckup extends React.Component {

  constructor(props){
    super(props)
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const serverData = {...values};
        serverData.detailsList = [
          {type: 'BMI', value: values.BMI},
          {type: 'SMOKING', value: values.SMOKING ? 1 : 0}
        ]
        serverData.userId = this.props.userInfo.userid
        delete values.BMI;
        delete values.SMOKING
        Axios.post(`http://192.168.4.239:8082/api/v1/checkup-details/update`, serverData).then(res => {
          if(res.status == 200) {
            message.success('Checkup Updated Successfully')
          }
        })
      } else {
        console.log(err)
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return(
      <div className='medContainer'>
        <h2>Update Medical Checkup Data</h2>
        <Form className="formContainer" onSubmit={this.handleSubmit}>
          <FormItem
            label="Physician"
            labelCol={{ span: 2 }}
            wrapperCol={{ span: 7 }}
          >
            {getFieldDecorator('doctorName', {
              rules: [{ required: true, message: 'Please enter the name of the physician!' }],
            })(
              <Input />
            )}
          </FormItem>
          <FormItem
            label="Bill Generated"
            labelCol={{ span: 2 }}
            wrapperCol={{ span: 7 }}
          >
            {getFieldDecorator('billGenerated', {
              rules: [{ required: true, message: 'Please enter the amount generated!' }],
            })(
              <Input />
            )}
          </FormItem>
          <FormItem
            label="Amount Paid"
            labelCol={{ span: 2 }}
            wrapperCol={{ span: 7 }}
          >
            {getFieldDecorator('amountPaid', {
              rules: [{ required: true, message: 'Please enter the amount paid!' }],
            })(
              <Input />
            )}
          </FormItem>
          <FormItem
            label="BMI"
            labelCol={{ span: 2 }}
            wrapperCol={{ span: 7 }}
          >
            {getFieldDecorator('BMI', {
              rules: [{ required: true, message: 'Please enter the BMI!' }],
            })(
              <Input />
            )}
          </FormItem>
          <FormItem
            label="Smoking"
            labelCol={{ span: 2 }}
            wrapperCol={{ span: 7 }}
          >
            {getFieldDecorator('SMOKING', {
              rules: [{ required: false, message: 'Please choose smoking status!' }],
            })(
              <Checkbox />
            )}
          </FormItem>
           <Button type="primary" htmlType="submit">
              Submit
           </Button>
        </Form>
        <style jsx>{styles}</style>
      </div>
    )
  }
}

export default Form.create()(MedicalCheckup);

const styles = css`
  .medContainer {
    width: 100%;
    height: 100%;
    background: #fff;
    border-radius: 5px;
    box-shadow: 0.75px 0.75px 3px -0.75px #ccc;
    padding: 20px 20px;
  }
  .formContainer {
    padding: 20px 0px;
  }
`;