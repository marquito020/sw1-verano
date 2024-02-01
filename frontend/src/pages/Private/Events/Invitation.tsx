import { Link, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useGetEvent } from "../../../hooks/useEvent.hook";

function Invitation() {
    const { id } = useParams();

    // Convertir id a un número o usar un valor por defecto
    const eventId: number = id ? parseInt(id, 10) : 0; // Puedes usar 0 u otro valor por defecto según tus necesidades

    const { eventFound, isLoading, error } = useGetEvent(eventId);

    if (isLoading) return <div>Loading...</div>;
    else if (error) return <div>Error {`${error}`}</div>;

    return (
        <div>
            <Toaster />
            <h1>{eventFound?.title}</h1>
            <p>{eventFound?.description}</p>
            <img src={eventFound?.qr} alt={eventFound?.title} />
            {/* Button Confirmar Asistencia */}
            <Link to={`/private/photos-sale`}
                onClick={() => {
                    toast.success("Asistencia Confirmada",);
                }}
                className="flex items-center gap-1  rounded-md bg-sky-500  text-white font-semibold  px-4 py-2 text-sm hover:bg-sky-600  focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
            >
                Confirmar Asistencia</Link>

        </div>
    );
}

export default Invitation;
