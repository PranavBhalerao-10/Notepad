import React from 'react'

const Alert = ({ isPinned, show }) => {
    return (
        show && <div class="alert alert-warning alert-dismissible fade show" role="alert">
            Your Note is {isPinned ? 'Pinned' : 'Unpinned'}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    )
}

export default Alert