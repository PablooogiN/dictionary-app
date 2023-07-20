import React from 'react'
import "./Definitions.css"

const Definitions = ({word, category, meanings}) => {
  return (
    <div className='meanings' >
        {/* {meanings[0] && word && category==='en' && (
            meanings[0].phonetics.map((p) => {
                <audio
                    src={p && p.audio}
                    style={{backgroundColor: '#fff', borderRadius: '10px'}}
                    controls
                >
                    Your Browser doesn't support audio element.
                </audio>
            })
        )} */}
        {meanings[0] && word && category==='en' && (
            <audio
                src={meanings[0].phonetics[0] && meanings[0].phonetics[0].audio}
                style={{backgroundColor: '#fff', borderRadius: '10px'}}
                controls
            >
                Your Browser doesn't support audio element.
            </audio>
        )}
        {word === "" ? (
            <span className='subTitle'>Start by writing a word in search</span>
        ) : (
            meanings.map((mean) => 
                mean.meanings.map((item) => 
                    item.definitions.map((def) => (
                        <div 
                            className='singleMeaning' 
                            style={{backgroundColor: "white", color: "black"}}
                        >
                            {def.definition}
                            <br/>
                            {def.example && (
                                <span>
                                    <b>Example: </b>
                                    {def.example}
                                </span>
                            )}
                            {def.synonyms.length > 0 && (
                                <span>
                                    <b>Synonyms: </b>
                                    {def.synonyms.map((s) => `${s}, `)}
                                </span>
                            )}
                            <hr style={{backgroundColor: "black", width: "100%"}}/>
                        </div>
                   ))
                )
            )
        )}
    </div>
  )
}

export default Definitions