import {
  Show,
  SimpleShowLayout,
  TextField,
  DateField,
  NumberField,
  ArrayField,
  Datagrid,
  useShowController,
} from 'react-admin'

export const OrderShow = () => {
  const { record } = useShowController()

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
          <Datagrid>
            <TextField source='paintingId' label='ID картины' />
            <NumberField source='quantity' label='📊 Количество' />
            <NumberField source='price' label='💰 Цена' />
          </Datagrid>
        </ArrayField>
      </SimpleShowLayout>
    </Show>
  )
}
