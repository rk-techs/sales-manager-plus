import { useEffect, useState } from 'react'
import { useForm } from '@inertiajs/react';
import Input from '@/Components/Form/Input';

export default function CustomerInfo({ handleClickSelect }) {
  const { data, setData, errors } = useForm({
    keyword: '',
  });

  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetchCustomers();
  }, []);

  async function fetchCustomers() {
    const response = await fetch(`/api/customers?keyword=${data.keyword}`);
    const customersJson = await response.json();
    setCustomers(customersJson);
  }

  function submit(e) {
    e.preventDefault();
    fetchCustomers();
  }

  function handleChange(e) {
    setData('keyword', e.target.value);
  }

  return (
    <>
      <form onSubmit={submit}>
        <header>
          <div className="u-flex u-mr-3">
            <Input
              type="search"
              onChange={handleChange}
              placeholder="取引先名, よみがな, ショートカット名で検索（Enter）"
            />
            <button className="btn btn-secondary">検索</button>
          </div>
          {errors.keyword && <div className="invalid-feedback">{errors.keyword}</div>}
        </header>
      </form>

      <div className="table-wrapper is-scrollable u-mt-4">
        <table className="table">
          <thead className="table-header">
            <tr className="table-row">
              <th className="th-cell u-w-80"></th>
              <th className="th-cell u-w-64">ID</th>
              <th className="th-cell">取引先名</th>
              <th className="th-cell">住所</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {customers.map(customer => (
              <tr key={customer.id} className="table-row is-hoverable">
                <td className="td-cell">
                  <button
                    className="btn btn-secondary"
                    onClick={() => handleClickSelect(customer)}
                  >
                    選択
                  </button>
                </td>
                <td className="td-cell">{customer.id}</td>
                <td className="td-cell">{customer.name}</td>
                <td className="td-cell">{customer.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}