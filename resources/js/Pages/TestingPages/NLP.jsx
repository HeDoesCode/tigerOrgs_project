import { useForm } from "@inertiajs/inertia-react"

function NLP() {

    const {data, setData, post} = useForm({
        resume: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route('testing.submit'));
    }
    return (
        <div>
            <form onSubmit={handleSubmit} action="" method="post" encType="multipart-form">
                <label htmlFor="resume">Resume</label>
                <input type="file" onChange={(e) => {setData("resume", e.target.files[0])}}  />
                <button type="submit">Submit</button>    
            </form>  
        </div>
    )
}

export default NLP
