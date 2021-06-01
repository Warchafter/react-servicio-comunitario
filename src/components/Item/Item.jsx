import React from 'react';

const Item = ({ type, content }) => {
    return (
        <div>
            {!type ? (
                <textarea
                    value={content}
                />
            ) : <p>Some new item</p>}
        </div>
    )
}

export default Item;