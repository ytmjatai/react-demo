import React, { useState, useEffect, EffectCallback } from 'react';
import { Form, Input } from 'antd';

const Edit = () => {

  return (
    <div>

      <Form>
        <Form.Item label="user">
          <Input disabled />
        </Form.Item>
        <Form.Item label={<span>user</span>}>
          <Input />
        </Form.Item>
      </Form>
    </div>
  )
}

export default Edit;