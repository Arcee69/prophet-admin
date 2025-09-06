import React, { useState } from 'react'
import { api } from '../../../../services/api'
import { appUrls } from '../../../../services/urls'
import { toast } from 'react-toastify'
import { CgSpinner } from 'react-icons/cg'
import { useDispatch } from 'react-redux'
import { fetchBlogs } from '../../../../features/blogs/getBlogsSlice'

const DeleteBlog = ({ deleteData, handleClose }) => {
    const [loading, setLoading] = useState(false)
  
    const dispatch = useDispatch()
  
    const handleDelete = async () => {
        setLoading(true)
      try {
        const res = await api.delete(appUrls?.BLOGS_URL + `/${deleteData.id}`)
          toast(`${res?.data?.message}`, {
              position: "top-right",
              autoClose: 5000,
              closeOnClick: true,
          })
        dispatch(fetchBlogs())
        handleClose()
      } catch (err) {
        console.error("Error deleting Blog:", err)
          toast(`${err?.data?.message}`, {
              position: "top-right",
              autoClose: 5000,
              closeOnClick: true,
          })
      } finally {
        setLoading(false)
      }
    }

  return (
    <div className="p-6 bg-white w-[500px] h-[200px] rounded-lg shadow mt-[250px]">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Delete Blog
      </h2>
      <p className="text-gray-600 mb-6">
        Are you sure you want to delete this blog?
        This action cannot be undone.
      </p>
      <div className="flex justify-end gap-3">
        <button
          className="px-4 py-2 rounded-md bg-gray-200 text-gray-700"
          onClick={handleClose}
          disabled={loading}
        >
          Cancel
        </button>
        <button
          className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 disabled:opacity-50"
          onClick={handleDelete}
          disabled={loading}
        >
          {loading ? <CgSpinner className="animate-spin text-lg text-white" /> : "Delete"}
        </button>
      </div>
    </div>
  )
}

export default DeleteBlog