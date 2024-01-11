
import { Link } from 'react-router-dom'

const SingleAuthors = () => {
  return (
    <div>
              <div className="flex items-center gap-2 mb-4   pr-32 pl-4 py-2 rounded-3xl bg-slate-800">
                <img
                  className="w-14 h-15 md:w-15 md:h-15 rounded-full"
                  src="data:image/jpeg;base64,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"
                  alt=""
                />
               <Link to='/'>
               <h1>Ava Sullivan</h1>
               </Link>
              </div>
              
            </div>
  )
}

export default SingleAuthors