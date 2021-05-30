import React from 'react';
import ReactDOM from 'react-dom';
import { ColumnsType } from 'antd/lib/table';
import * as antd from 'antd';

import { AppContext, server, handler } from '../AppContext';
import { PrimaryButton } from '../components/PrimaryButton';
import { Notification } from '../components/Notification';

const AddServer = () => {
  const appCtx = React.useContext(AppContext);

  React.useEffect(() => {}, []);

  const onFinish = async (values: any) => {
    appCtx.setModal(null);

    for (const item of appCtx.dataSource) {
      if (item.name === values.name) {
        Notification.add('error', '服務名稱重複');
        return;
      }
    }

    appCtx.setDataSource((preState: server[]) => {
      let temp: server;

      if (preState.length !== 0) {
        let last = preState[preState.length - 1];
        temp = {
          id: last.id + 1,
          domain: values.domain,
          name: values.name,
          port: values.port,
          handlers: [],
        };
      } else {
        temp = {
          id: 1,
          domain: values.domain,
          name: values.name,
          port: values.port,
          handlers: [],
        };
      }

      preState.push(temp);
      return [...preState];
    });

    Notification.add('success', '新增成功');
  };

  return (
    <antd.Form onFinish={onFinish}>
      <h5 className="font-weight-bold mb-4">Add New Server</h5>

      <antd.Form.Item name="name" rules={[{ required: true, message: 'Server名稱不可以空白!' }]}>
        <antd.Input prefix={<i className="fa fa-comment" />} placeholder="請輸入Server名稱" />
      </antd.Form.Item>

      <antd.Form.Item name="domain">
        <antd.Input prefix={<i className="fa fa-at" />} placeholder="請輸入Domain" />
      </antd.Form.Item>

      <antd.Form.Item name="port" rules={[{ required: true, message: 'Port不可以空白!' }]}>
        <antd.Input prefix={<i className="fa fa-code-fork" />} placeholder="請輸入Port" />
      </antd.Form.Item>

      <antd.Form.Item className="text-center">
        <PrimaryButton title="Add" htmlType="submit" />
      </antd.Form.Item>
    </antd.Form>
  );
};

export { AddServer };
