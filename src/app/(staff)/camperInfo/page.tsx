// write your code here
import CamperInfoTable from '../../../components/info/camperInfoTable'

export default function ClassroomPage() {
  return (
    <div>
      <CamperInfoTable camper={[{ 
      camperId: 1, 
      name: "John", 
      surname: 'Doe', 
      nickname: 'Johnny', 
      contactTel: '123456789', 
      contactEmail: 'john.doe@example.com', 
      parentTel: '987654321',
      parentRelation: 'Mother',
      school: 'XYZ School',
      IDLine: 'johnny123',
      FEyear: '2022',
      room: 'Room B',
      healthInfo: 'Peanut allergy',
      foodInfo: 'Vegan',
      },{camperId: 2, 
      name: "Jane", 
      surname: 'Smith', 
      nickname: 'Janey', 
      contactTel: '987654321', 
      contactEmail: 'jane.smith@example.com', 
      parentTel: '123456789',
      parentRelation: 'Father',
      school: 'LMN School',
      IDLine: 'janey456',
      FEyear: '2023',
      room: 'Room C',
      healthInfo: 'Lactose intolerant',
      foodInfo: 'Gluten-free',}]}/>
    </div>
  )
}