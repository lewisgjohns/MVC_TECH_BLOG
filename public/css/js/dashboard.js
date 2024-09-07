const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/blogs/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.reload();
      } else {
        alert('Failed to delete post');
      }
    }
  };
  
  document.querySelector('.delete-post').addEventListener('click', delButtonHandler);
  