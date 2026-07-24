import {
  Show,
  SimpleShowLayout,
  TextField,
  DateField,
  NumberField,
  ArrayField,
  Datagrid,
  ImageField,
  useShowController,
  useDataProvider,
  useNotify,
  useRefresh,
  useListContext,
  Button,
} from 'react-admin'
import { useState } from 'react'

const OrderItemsBulkDeleteButton = () => {
  const { record } = useShowController()
  const dataProvider = useDataProvider()
  const notify = useNotify()
  const refresh = useRefresh()
  const { selectedIds } = useListContext()

  const handleDelete = async () => {
    if (!selectedIds || selectedIds.length === 0) {
      notify('Выберите позиции для удаления', { type: 'warning' })
      return
    }

    if (!window.confirm('Вы уверены, что хотите удалить выбранные позиции?')) {
      return
    }

    try {
      await dataProvider.deleteOrderItems(
        Number(record.id),
        selectedIds.map(Number)
      )

      notify('ra.notification.deleted', {
        type: 'success',
        messageArgs: { smart_count: selectedIds.length },
      })
      refresh()
    } catch (error) {
      notify('ra.notification.http_error', { type: 'error' })
    }
  }

  return (
    <Button
      label='🗑️ Удалить выбранные позиции'
      onClick={handleDelete}
      disabled={!selectedIds || selectedIds.length === 0}
    />
  )
}

const SendCustomerEmailButton = () => {
  const { record } = useShowController()
  const dataProvider = useDataProvider()
  const notify = useNotify()
  const [isSending, setIsSending] = useState(false)

  const handleSend = async () => {
    if (!record?.id) {
      notify('Заказ не найден', { type: 'warning' })
      return
    }

    if (!record.customerEmail) {
      notify('У заказа нет email клиента', { type: 'warning' })
      return
    }

    if (
      !window.confirm(
        `Отправить письмо клиенту на адрес ${record.customerEmail}?`
      )
    ) {
      return
    }

    setIsSending(true)

    try {
      await dataProvider.sendOrderCustomerEmail(Number(record.id))
      notify('Письмо клиенту отправлено', { type: 'success' })
    } catch (error) {
      notify('Не удалось отправить письмо клиенту', { type: 'error' })
    } finally {
      setIsSending(false)
    }
  }

  return (
    <Button
      label={isSending ? 'Отправка письма...' : '✉️ Отправить письмо клиенту'}
      onClick={handleSend}
      disabled={isSending}
    />
  )
}

export const OrderShow = () => {
  return (
    <Show>
      <SimpleShowLayout>
        <SendCustomerEmailButton />
        <TextField source='id' />
        <TextField source='customerName' label='👤 Имя клиента' />
        <TextField source='customerEmail' label='✉️ Email' />
        <TextField source='customerPhone' label='📱 Телефон' />
        <TextField source='shippingAddress' label='🏠 Адрес доставки' />
        <TextField source='description' label='📝 Комментарий к заказу' />
        <NumberField source='totalPrice' label='💰 Общая сумма' />
        <TextField source='status.displayName' label='📊 Статус' />
        <DateField source='createdAt' label='📅 Дата создания' showTime />
        <DateField source='updatedAt' label='🔄 Дата обновления' showTime />

        <ArrayField source='orderItems' label='📦 Позиции заказа'>
          <Datagrid bulkActionButtons={<OrderItemsBulkDeleteButton />}>
            <TextField source='id' label='ID позиции' />
            <ImageField
              source='painting.imgUrl'
              label='🖼️ Картина'
              sortable={false}
            />
            <TextField
              source='painting.title'
              label='Название картины'
              sortable={false}
            />
            <TextField source='paintingId' label='ID картины' />
            <NumberField source='quantity' label='📊 Количество' />
            <NumberField source='price' label='💰 Цена' />
          </Datagrid>
        </ArrayField>
      </SimpleShowLayout>
    </Show>
  )
}
