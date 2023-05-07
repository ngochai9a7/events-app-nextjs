import Image from 'next/image';
function EventPage({event}) {
    console.log(event);
    return (
        <div>
            <Image width={1000} height={500} src={event.image} alt={event.title}/>
            <h2>{event.title}</h2>
            <p>{event.description}</p>
        </div>
        
    )
}
export default EventPage;

export async function getStaticPaths() {
    const { allEvents } = await import('/data/data.json');
    const allPaths = allEvents.map((ev) => {
        return {
            params: {
                cat: ev.city,
                id: ev.id.toString(),
            }
        }
    })
    console.log(allPaths)
    return {
        paths: allPaths,
        fallback: false
    }
}

export async function getStaticProps(context) {
    
    const id = context?.params.id;
    const { allEvents } = await import('/data/data.json'); 
    const data = allEvents.find(ev => ev.id === id)
    
    return {
        props: {
            event: data
            
            
        }
    }
}