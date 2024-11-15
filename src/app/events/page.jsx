import Events from '@/components/Events/Events'
import data from '../../../DB.json'

export default async function Page() {
	
	return <Events eventList={data}/>
}