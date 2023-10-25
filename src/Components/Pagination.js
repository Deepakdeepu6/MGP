import React,{useState} from 'react'
import './Pagination.css'

export const Paginations = ({currentPage , postsPerPage , totalPosts , paginate}) => {
    const pageNumber = [];
    let i;
    const [pageNumberLimit,setPageNumberLimit] = useState(2)
    const [maxPageNumberLimit,setMaxPageNumberLimit] = useState(2)
    const [minPageNumberLimit,setMinPageNumberLimit] = useState(0)
    for( i= 1;i<=Math.ceil(totalPosts / postsPerPage);i++){
       if(i < maxPageNumberLimit + 1 && i > minPageNumberLimit){
             pageNumber.push(i);
             console.log("length"+i)

       }

    }

    const onClickPrev = ()=>{
        if(currentPage > 1 ){
        paginate(currentPage - 1)
        if((currentPage-1)% pageNumberLimit == 0){
            setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit)
            setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit)
  
          }
        }

    }
    const onClickNext = ()=>{
        console.log(currentPage + " " + maxPageNumberLimit  + "" + i)
        if(currentPage + 1 < i){
            paginate(currentPage + 1)
        if(currentPage + 1 > maxPageNumberLimit){
          setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit)
          setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit)

        }
      }
    }


  return (
    <nav>
        <ul className='pagination'>
            <li className='arrow'><button  onClick={onClickPrev}>Prev</button></li>
            {
                pageNumber.map(number => (
                    <li key={number} className={currentPage == number?'active':null} onClick={()=>paginate(number)}>
                            <span>{number} </span>

                    </li>
                ))

            }
            <li className='arrow'><button className='' onClick={onClickNext}>Next</button></li>

        </ul>
        

    </nav>
  )
}
