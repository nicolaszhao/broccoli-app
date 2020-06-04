import React from 'react';
import Form from 'rc-field-form';
import LabelField from '../LabelField';
import Input from '../Input';
import style from './index.module.scss';

export default function InviteForm({
  sending = false,
  onSend,
}) {
  return (
    <Form onFinish={(data) => onSend(data)}>
      <LabelField
        name="name"
        label="Full Name"
        rules={[{ required: true, min: 3 }]}
      >
        <Input placeholder="Full Name" />
      </LabelField>
      <LabelField
        name="email"
        label="Email"
        rules={[{ required: true, type: 'email' }]}
      >
        <Input placeholder="Email" inputMode="email" />
      </LabelField>
      <LabelField
        name="comfirm_email"
        label="Comfirm Email"
        rules={[
          { required: true, message: '"comfirm email" is required.' },
          (context) => ({
            validator(rule, value) {
              const { email } = context.getFieldsValue(true);
              if (email !== value) {
                return Promise.reject('"comfirm email" is not same as email.');
              }
              return Promise.resolve();
            },
          }),
        ]}
      >
        <Input placeholder="Confirm Email" inputMode="email" />
      </LabelField>
      <div className={style.buttonspane}>
        <button type="submit" className="button" disabled={sending}>
          {!sending ? 'Send' : 'Sending, please wait...'}
        </button>
      </div>
    </Form>
  );
}
