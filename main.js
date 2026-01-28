//HTTP request get,get/id,post,put/id, delete/id (soft delete)

// ===== POSTS FUNCTIONS =====
async function LoadData() {
    try {
        let res = await fetch('http://localhost:3000/posts');
        let posts = await res.json();
        let body = document.getElementById("table-body");
        body.innerHTML = "";

        for (const post of posts) {
            // Apply strikethrough style for soft-deleted posts
            let rowStyle = post.isDeleted ? 'style="text-decoration: line-through; opacity: 0.6;"' : '';
            let deleteBtn = post.isDeleted
                ? `<input type='submit' value='restore' onclick='RestorePost("${post.id}")'/>`
                : `<input type='submit' value='delete' onclick='DeletePost("${post.id}")'/> <input type='submit' value='edit' onclick='EditPost("${post.id}")'/> <input type='submit' value='comments' onclick='ShowComments("${post.id}")'/>`

            body.innerHTML += `<tr ${rowStyle}>
                <td>${post.id}</td>
                <td>${post.title}</td>
                <td>${post.views}</td>
                <td>${deleteBtn}</td>
            </tr>`;
        }
        return false;
    } catch (error) {
        console.log(error);
    }
}

async function Save() {
    let id = document.getElementById("id_txt").value.trim();
    let title = document.getElementById("title_txt").value;
    let views = document.getElementById("view_txt").value;

    // If ID is empty or not provided, generate new ID (maxId + 1)
    if (!id) {
        let res = await fetch('http://localhost:3000/posts');
        let posts = await res.json();

        // Find max ID and increment by 1
        let maxId = 0;
        for (const post of posts) {
            let currentId = parseInt(post.id);
            if (!isNaN(currentId) && currentId > maxId) {
                maxId = currentId;
            }
        }
        id = String(maxId + 1);
    }

    let getItem = await fetch("http://localhost:3000/posts/" + id);
    if (getItem.ok) {
        // Post exists -> PUT (update)
        let existingPost = await getItem.json();
        let res = await fetch('http://localhost:3000/posts/' + id, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: id,
                title: title,
                views: views,
                isDeleted: existingPost.isDeleted || false
            })
        });

        if (res.ok) {
            console.log("edit du lieu thanh cong");
            ClearForm();
        }
    } else {
        // Post doesn't exist -> POST (create)
        let res = await fetch('http://localhost:3000/posts', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: id,
                title: title,
                views: views,
                isDeleted: false
            })
        });

        if (res.ok) {
            console.log("them du lieu thanh cong");
            ClearForm();
        }
    }
    LoadData();
}

// Soft delete - set isDeleted to true
async function DeletePost(id) {
    let getItem = await fetch("http://localhost:3000/posts/" + id);
    if (getItem.ok) {
        let post = await getItem.json();
        let res = await fetch('http://localhost:3000/posts/' + id, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ...post,
                isDeleted: true
            })
        });

        if (res.ok) {
            console.log("xoa mem thanh cong");
        }
    }
    LoadData();
}

// Restore soft-deleted post
async function RestorePost(id) {
    let getItem = await fetch("http://localhost:3000/posts/" + id);
    if (getItem.ok) {
        let post = await getItem.json();
        let res = await fetch('http://localhost:3000/posts/' + id, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ...post,
                isDeleted: false
            })
        });

        if (res.ok) {
            console.log("khoi phuc thanh cong");
        }
    }
    LoadData();
}

// Edit post - load data into form
async function EditPost(id) {
    let res = await fetch("http://localhost:3000/posts/" + id);
    if (res.ok) {
        let post = await res.json();
        document.getElementById("id_txt").value = post.id;
        document.getElementById("title_txt").value = post.title;
        document.getElementById("view_txt").value = post.views;
    }
}

function ClearForm() {
    document.getElementById("id_txt").value = "";
    document.getElementById("title_txt").value = "";
    document.getElementById("view_txt").value = "";
}

// ===== COMMENTS FUNCTIONS =====
async function ShowComments(postId) {
    document.getElementById("current-post-id").value = postId;
    document.getElementById("comments-section").style.display = "block";
    LoadComments(postId);
}

async function LoadComments(postId) {
    try {
        let res = await fetch(`http://localhost:3000/comments?postId=${postId}`);
        let comments = await res.json();
        let tbody = document.getElementById("comments-table-body");
        tbody.innerHTML = "";

        for (const comment of comments) {
            // Apply strikethrough style for soft-deleted comments
            let rowStyle = comment.isDeleted ? 'style="text-decoration: line-through; opacity: 0.6;"' : '';
            let deleteBtn = comment.isDeleted
                ? `<input type='submit' value='restore' onclick='RestoreComment("${comment.id}")'/>`
                : `<input type='submit' value='delete' onclick='DeleteComment("${comment.id}")'/> <input type='submit' value='edit' onclick='EditComment("${comment.id}")'/>`

            tbody.innerHTML += `<tr ${rowStyle}>
                <td>${comment.id}</td>
                <td>${comment.text}</td>
                <td>${deleteBtn}</td>
            </tr>`;
        }
    } catch (error) {
        console.log(error);
    }
}

async function SaveComment() {
    let commentId = document.getElementById("comment-id-txt").value.trim();
    let commentText = document.getElementById("comment-text-txt").value;
    let postId = document.getElementById("current-post-id").value;

    // If ID is empty, generate new ID (maxId + 1)
    if (!commentId) {
        let res = await fetch('http://localhost:3000/comments');
        let comments = await res.json();

        let maxId = 0;
        for (const comment of comments) {
            let currentId = parseInt(comment.id);
            if (!isNaN(currentId) && currentId > maxId) {
                maxId = currentId;
            }
        }
        commentId = String(maxId + 1);
    }

    let getItem = await fetch("http://localhost:3000/comments/" + commentId);
    if (getItem.ok) {
        // Comment exists -> PUT (update)
        let existingComment = await getItem.json();
        let res = await fetch('http://localhost:3000/comments/' + commentId, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: commentId,
                text: commentText,
                postId: postId,
                isDeleted: existingComment.isDeleted || false
            })
        });

        if (res.ok) {
            console.log("cap nhat comment thanh cong");
            ClearCommentForm();
        }
    } else {
        // Comment doesn't exist -> POST (create)
        let res = await fetch('http://localhost:3000/comments', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: commentId,
                text: commentText,
                postId: postId,
                isDeleted: false
            })
        });

        if (res.ok) {
            console.log("them comment thanh cong");
            ClearCommentForm();
        }
    }
    LoadComments(postId);
}

// Soft delete comment
async function DeleteComment(id) {
    let getItem = await fetch("http://localhost:3000/comments/" + id);
    if (getItem.ok) {
        let comment = await getItem.json();
        let res = await fetch('http://localhost:3000/comments/' + id, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ...comment,
                isDeleted: true
            })
        });

        if (res.ok) {
            console.log("xoa mem comment thanh cong");
            LoadComments(comment.postId);
        }
    }
}

// Restore soft-deleted comment
async function RestoreComment(id) {
    let getItem = await fetch("http://localhost:3000/comments/" + id);
    if (getItem.ok) {
        let comment = await getItem.json();
        let res = await fetch('http://localhost:3000/comments/' + id, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ...comment,
                isDeleted: false
            })
        });

        if (res.ok) {
            console.log("khoi phuc comment thanh cong");
            LoadComments(comment.postId);
        }
    }
}

// Edit comment - load data into form
async function EditComment(id) {
    let res = await fetch("http://localhost:3000/comments/" + id);
    if (res.ok) {
        let comment = await res.json();
        document.getElementById("comment-id-txt").value = comment.id;
        document.getElementById("comment-text-txt").value = comment.text;
    }
}

function ClearCommentForm() {
    document.getElementById("comment-id-txt").value = "";
    document.getElementById("comment-text-txt").value = "";
}

function HideComments() {
    document.getElementById("comments-section").style.display = "none";
    ClearCommentForm();
}

// Initialize
LoadData();
