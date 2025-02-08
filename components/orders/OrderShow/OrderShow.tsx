import {
  Show,
  SimpleShowLayout,
  TextField,
  DateField,
  NumberField,
  ArrayField,
  Datagrid,
  useShowController,
  useDataProvider,
  useNotify,
  useRefresh,
  useListContext,
  Button,
} from 'react-admin'

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
      console.log('=== Начало удаления позиций ===')
      console.log('ID заказа:', record?.id)
      console.log('Тип ID заказа:', typeof record?.id)
      console.log('Выбранные позиции:', selectedIds)
      console.log('Тип выбранных позиций:', typeof selectedIds)

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
      console.error('Ошибка при удалении:', error)
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

export const OrderShow = () => {
  return (
    <Show>
      <SimpleShowLayout>
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
            <TextField source='paintingId' label='ID картины' />
            <NumberField source='quantity' label='📊 Количество' />
            <NumberField source='price' label='💰 Цена' />
          </Datagrid>
        </ArrayField>
      </SimpleShowLayout>
    </Show>
  )
}
