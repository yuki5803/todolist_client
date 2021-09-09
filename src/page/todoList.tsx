import { Button, Card, Form, Input, message, Select, Table } from 'antd'
import { useCallback, useEffect, useState } from 'react'
import 'antd/dist/antd.css'
import Column from 'antd/lib/table/Column'
import './todoList.scss'
import Modal from 'antd/lib/modal/Modal'
import useStore from 'store'
import { OrderModel, StatusEnum, StatusMap } from 'model/order'
import { useForm } from 'antd/lib/form/Form'

type FormProps = {
  orderNo: string
  amount: number
  status: StatusEnum
  fileUrl: string
  userName: string
}

const TodoList = () => {
  const { order } = useStore()
  // var testObj = {
  //   prop1: '0',
  //   prop2: '0%',
  // }
  const [page, setPage] = useState(1)
  const [form] = useForm<FormProps>()
  const [data, setData] = useState<OrderModel[]>()
  const [total, setTotal] = useState<number>()
  const [modelShow, setModelShow] = useState(false)
  const pageSize = 5

  // const onPost = async () => {
  //   const res = await apiBase._post({
  //     url: '/ping',
  //     body: { page: 1, page_size: 10 },
  //   })
  //   if (!res.success) {
  //     message.info(res.err_msg)
  //     return
  //   }
  //   setData(res.data.list)
  // }

  // useEffect(() => {
  //   anime({
  //     duration: 300,
  //     targets: testObj,
  //     prop1: '300',
  //     prop2: '100%',
  //     round: 1,
  //     easing: 'linear',
  //     autoplay: true,
  //     update: function () {
  //       setObj({ ...testObj })
  //     },
  //   })
  //   anime({
  //     targets: '.test-box',
  //     width: '100',
  //     autoplay: true,
  //   })
  // }, [])

  const onfetchData = useCallback(async () => {
    setData(undefined)
    setTotal(undefined)
    const { list, total_page } = await order.getOrder({
      page: page,
      page_size: pageSize,
    })
    setData(list)
    setTotal(total_page)
  }, [order, page])

  useEffect(() => {
    onfetchData()
  }, [onfetchData])

  const onAdd = async (formData: FormProps) => {
    const res = await order.addOrder({
      order_no: formData.orderNo,
      amount: Number(formData.amount),
      file_url: formData.fileUrl,
      status: formData.status,
      user_name: formData.userName,
    })
    if (res.success) {
      message.success('添加成功！')
      onfetchData()
      setModelShow(false)
      form.resetFields()
      return
    }
    message.error(res.err_msg)
  }

  const onUpdate = async (orderNo: string) => {
    const res = await order.updateOrder({
      order_no: orderNo,
      amount: 1000,
      status: StatusEnum.End,
      file_url: '/home',
    })
    if (res.success) {
      message.success('更新成功!')
      onfetchData()
      return
    }
    message.error(res.err_msg)
  }

  const onDelete = async (id: number) => {
    const res = await order.deleteOrder({
      id: id,
    })
    if (res.success) {
      message.success('删除成功!')
      onfetchData()
      return
    }
    message.error(res.err_msg)
  }

  return (
    <div className="todo_list-page ">
      <Card className="todo_list">
        <div className="action-bar">
          <Button
            type="primary"
            onClick={() => {
              setModelShow(true)
            }}
          >
            New
          </Button>
        </div>

        <Table
          loading={!data}
          scroll={{ x: true }}
          dataSource={data}
          pagination={{
            position: ['bottomCenter'],
            pageSize: pageSize,
            onChange: setPage,
            total: total,
          }}
        >
          <Column align="center" dataIndex="id" title="id" />
          <Column align="center" dataIndex="order_no" title="order_no" />
          <Column align="center" dataIndex="user_name" title="user_name" />
          <Column align="center" dataIndex="amount" title="amount" />
          <Column align="center" dataIndex="status" title="status" />
          <Column align="center" dataIndex="file_url" title="file_url" />
          <Column
            align="center"
            dataIndex="file_url"
            title="action"
            render={(_, record: any) => {
              return (
                <>
                  <Button
                    type="primary"
                    onClick={() => onUpdate(record.order_no)}
                    style={{ marginRight: 10 }}
                  >
                    Update
                  </Button>
                  <Button
                    type="primary"
                    onClick={() => onDelete(record.id)}
                    danger
                  >
                    Delete
                  </Button>
                </>
              )
            }}
          />
        </Table>
      </Card>
      <Modal
        visible={modelShow}
        onCancel={() => setModelShow(false)}
        onOk={() => form.submit()}
      >
        <Form
          form={form}
          style={{ marginTop: 30 }}
          onFinish={() => {
            onAdd(form.getFieldsValue())
          }}
        >
          <Form.Item name="orderNo" label="订单号">
            <Input style={{ width: 100 }} />
          </Form.Item>
          <Form.Item name="userName" label="用户名">
            <Input style={{ width: 200 }} />
          </Form.Item>
          <Form.Item name="amount" label="金额">
            <Input style={{ width: 200 }} />
          </Form.Item>
          <Form.Item name="status" label="状态">
            <Select style={{ width: 200 }}>
              <Select.Option value={StatusEnum.Start}>
                {StatusMap[StatusEnum.Start]}
              </Select.Option>
              <Select.Option value={StatusEnum.End}>
                {StatusMap[StatusEnum.End]}
              </Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="fileUrl" label="URL">
            <Input style={{ width: 200 }} />
          </Form.Item>
        </Form>
      </Modal>

      {/* <div className="number">{obj.prop1}</div>
      <div className="number">{obj.prop2}</div>
      <div className="test-box"></div> */}
      {/* <div className="top-button"> 
        <Button onClick={() => onPost()} type="primary">
          点击发送请求
        </Button>
        <Button onClick={() => onAdd()} type="primary">
          点击发送新增请求
        </Button>
      </div>

      <Table
        className="todo_list"
        scroll={{ x: true }}
        dataSource={data}
        pagination={{
          position: ['bottomCenter'],
        }}
      >
        <Column align="center" dataIndex="id" title="id" />
        <Column align="center" dataIndex="order_no" title="order_no" />
        <Column align="center" dataIndex="user_name" title="user_name" />
        <Column align="center" dataIndex="amount" title="amount" />
        <Column align="center" dataIndex="status" title="status" />
        <Column align="center" dataIndex="file_url" title="file_url" />
      </Table> */}
    </div>
  )
}

export default TodoList
