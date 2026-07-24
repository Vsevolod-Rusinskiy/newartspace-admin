import { Create, SimpleForm, TextInput } from 'react-admin'

export const WorkingHoursCreate = () => (
  <Create mutationMode='pessimistic'>
    <SimpleForm>
      <TextInput
        source='scheduleText'
        label='Дни работы (например: С понедельника по воскресенье)'
        fullWidth
        defaultValue=''
      />
      <TextInput
        source='appointmentText'
        label='По записи (например: По предварительной договорённости)'
        fullWidth
        defaultValue=''
      />
    </SimpleForm>
  </Create>
)
