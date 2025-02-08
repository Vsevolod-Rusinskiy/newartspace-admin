import {
  Datagrid,
  List,
  TextField,
  DateField,
  NumberField,
  SearchInput,
} from 'react-admin'

const OrderFilters = [
  <SearchInput
    key='email'
    source='customerEmail'
    placeholder='✉️ Поиск по email'
    alwaysOn
  />,
]

export const OrderList = (props) => {
  return (
    <List {...props} filters={OrderFilters}>
      <Datagrid rowClick='show'>
        <TextField source='id' />
        <TextField source='customerName' label='👤 Имя клиента' />
        <TextField source='customerEmail' label='✉️ Email' />
        <TextField source='customerPhone' label='📱 Телефон' />
        <NumberField source='totalPrice' label='💰 Сумма заказа' />
        <TextField source='status.displayName' label='📊 Статус' />
        <DateField source='createdAt' label='📅 Дата создания' showTime />
      </Datagrid>
    </List>
  )
}
