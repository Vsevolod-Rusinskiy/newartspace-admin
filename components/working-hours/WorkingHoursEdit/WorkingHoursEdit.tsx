import { Edit, SimpleForm, TextInput } from 'react-admin'

export const WorkingHoursEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput
        source='scheduleText'
        label='Дни работы (например: С понедельника по воскресенье)'
        fullWidth
      />
      <TextInput
        source='appointmentText'
        label='По записи (например: По предварительной договорённости)'
        fullWidth
      />
    </SimpleForm>
  </Edit>
)
