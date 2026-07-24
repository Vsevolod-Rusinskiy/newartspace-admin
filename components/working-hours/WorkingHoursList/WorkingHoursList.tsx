import { Datagrid, List, NumberField, TextField } from 'react-admin'

export const WorkingHoursList = (props) => {
  return (
    <List {...props}>
      <Datagrid rowClick='show'>
        <NumberField source='id' label='id' />
        <TextField source='scheduleText' label='🗓️ Дни работы' />
        <TextField source='appointmentText' label='📞 По записи' />
      </Datagrid>
    </List>
  )
}
