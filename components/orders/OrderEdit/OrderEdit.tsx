import { useState, useEffect } from 'react'
import axios from 'axios'
import {
  Edit,
  SimpleForm,
  SelectInput,
  TextInput,
  useShowController,
} from 'react-admin'

const apiUrl = import.meta.env.VITE_APP_API_URL || 'https://back.newartspace.ru'

export const OrderEdit = () => {
  const { record } = useShowController()
  const [statuses, setStatuses] = useState([])

  useEffect(() => {
    const fetchStatuses = async () => {
      try {
        const response = await axios.get(`${apiUrl}/orders/statuses/list`)
        const formattedStatuses = response.data.map((status) => ({
          id: status.id,
          name: status.displayName,
        }))
        setStatuses(formattedStatuses)
      } catch (error) {}
    }

    fetchStatuses()
  }, [])

  return (
    <Edit>
      <SimpleForm>
        <SelectInput
          source='statusId'
          choices={statuses}
          label='📊 Статус заказа'
        />
        <TextInput
          source='shippingAddress'
          label='🏠 Адрес доставки'
          fullWidth
        />
        <TextInput
          source='description'
          label='📝 Комментарий к заказу'
          multiline
          rows={4}
          fullWidth
        />
      </SimpleForm>
    </Edit>
  )
}
