import Image from 'next/image';
import Link from 'next/link';
function EventsCatPage({data, pageName, pageDesc}) {
    return (
        <div>
            <h1>Event in {pageName}</h1>
            

            {data.map((ev) => (
                <Link key={ev.id} href={`/events/${ev.city}/${ev.id}`} passHref>  
                    <Image width={300} height={300} src={ev.image} alt={ev.title}/>
                    <h2>{ev.title}</h2>
                    <p>{ev.description}</p>
                </Link>
                
            ))}
        </div>
        
    )
}
export default EventsCatPage;

export async function getStaticPaths() {
    const { events_categories } = await import('/data/data.json');
    const allPaths = events_categories.map((ev) => {
        return {
            params: {
                cat: ev.id.toString(),
            }
        }
    })
    
    return {
        paths: allPaths,
        fallback: false
    }
}
export async function getStaticProps(context) {
    
    const id = context?.params.cat;
    const { allEvents } = await import('/data/data.json'); 
    const data = allEvents.filter(ev => ev.city === id)
    
    return {
        props: {
            data,
            pageName: id,
            
            
        }
    }
}