import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Alert from '@/Components/Alert';
import ContentInfoBar from '@/Components/ContentInfoBar';
import Modal from '@/Components/Modal';
import ContactForm from './Partials/ContactForm';
import AddressForm from './Partials/AddressForm';
import SalesActivityForm from './Partials/SalesActivityForm';
import TermDetails from './Partials/TermDetails';

const Show = ({ customer, userOptions, addressTypeOptions, leadSourceOptions }) => {
  const { flash } = usePage().props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isSalesActivityModalOpen, setIsSalesActivityModalOpen] = useState(false);

  return (
    <>
      <h1 className="content-title">取引先 詳細</h1>

      <ContentInfoBar
        createdAt={customer.created_at}
        createdBy={customer.created_by.name}
        updatedAt={customer.updated_at}
        updatedBy={customer.updated_by?.name}
      />

      <div className="content-navbar">
        <Link
          href={route('customers.edit', customer)}
          className="btn btn-secondary u-mr-3"
        >
          編集する
        </Link>
        <button
          onClick={() => setIsModalOpen(true)}
          className="btn btn-secondary u-mr-3">
          +連絡先を追加
        </button>
        <button
          onClick={() => setIsAddressModalOpen(true)}
          className="btn btn-secondary u-mr-3">
          +配送情報を追加
        </button>
        <button
          onClick={() => setIsSalesActivityModalOpen(true)}
          className="btn btn-secondary u-mr-3">
          +営業履歴を追加
        </button>
      </div>

      {isModalOpen &&
        <Modal closeModal={() => setIsModalOpen(false)} title="連絡先登録">
          <ContactForm
            customer={customer}
            userOptions={userOptions}
            leadSourceOptions={leadSourceOptions}
            closeModal={() => setIsModalOpen(false)}
          />
        </Modal>}

      {isAddressModalOpen &&
        <Modal closeModal={() => setIsAddressModalOpen(false)} title="配送情報 登録">
          <AddressForm customer={customer} addressTypeOptions={addressTypeOptions} closeModal={() => setIsAddressModalOpen(false)} />
        </Modal>}

      {isSalesActivityModalOpen &&
        <Modal closeModal={() => setIsSalesActivityModalOpen(false)} title="営業履歴 登録">
          <SalesActivityForm customer={customer} userOptions={userOptions} closeModal={() => setIsSalesActivityModalOpen(false)} />
        </Modal>}

      <Alert type="success" message={flash.message} />

      <div className="content-section">

        <div className="content-section-title">
          基本情報
        </div>

        <div className="table-wrapper">
          <table className="table">
            <tbody className="tbody">

              <tr className="table-row">
                <th className="th-cell u-w-200">取引先名</th>
                <td className="td-cell">{customer.name}</td>
              </tr>

              <tr className="table-row">
                <th className="th-cell">よみがな</th>
                <td className="td-cell">{customer.name_kana}</td>
              </tr>

              <tr className="table-row">
                <th className="th-cell">ショートカット名</th>
                <td className="td-cell">{customer.shortcut}</td>
              </tr>

              <tr className="table-row">
                <th className="th-cell">住所</th>
                <td className="td-cell">{customer.postal_code} {customer.address}</td>
              </tr>

              <tr className="table-row">
                <th className="th-cell">TEL</th>
                <td className="td-cell">{customer.tel}</td>
              </tr>

              <tr className="table-row">
                <th className="th-cell">FAX</th>
                <td className="td-cell">{customer.fax}</td>
              </tr>

              <tr className="table-row">
                <th className="th-cell">支払条件</th>
                <td className="td-cell">
                  <TermDetails term={customer.purchase_term} />
                </td>
              </tr>

              <tr className="table-row">
                <th className="th-cell">請求条件</th>
                <td className="td-cell">
                  <TermDetails term={customer.sales_term} />
                </td>
              </tr>

              <tr className="table-row">
                <th className="th-cell">担当ユーザー</th>
                <td className="td-cell">{customer.in_charge_user?.name}</td>
              </tr>

              <tr className="table-row">
                <th className="th-cell">備考</th>
                <td className="td-cell">{customer.note}</td>
              </tr>

            </tbody>
          </table>
        </div>
      </div>

      <div className="content-section">
        <div className="content-section-title">
          連絡先
        </div>
        <div className="table-wrapper is-scrollable">
          <table className="table">
            <thead className="table-header is-sticky">
              <tr className="table-row">
                <th className="th-cell col-fixed">ID</th>
                <th className="th-cell">役割</th>
                <th className="th-cell">名前</th>
                <th className="th-cell">よみがな</th>
                <th className="th-cell">TEL</th>
                <th className="th-cell">携帯</th>
                <th className="th-cell">E-mail</th>
                <th className="th-cell">役職</th>
                <th className="th-cell u-min-w-120">担当ユーザー</th>
                <th className="th-cell u-min-w-120">獲得元</th>
                <th className="th-cell u-text-center u-min-w-80">使用状況</th>
                <th className="th-cell u-w-120">備考</th>
              </tr>
            </thead>
            <tbody className="table-body">
              {customer.contacts.map(contact => (
                <tr key={contact.id} className="table-row is-hoverable">
                  <td className="td-cell col-fixed">{contact.id}</td>
                  <td className="td-cell">{contact.role}</td>
                  <td className="td-cell u-min-w-160">{contact.name}</td>
                  <td className="td-cell">{contact.name_kana}</td>
                  <td className="td-cell u-min-w-160">{contact.tel}</td>
                  <td className="td-cell u-min-w-160">{contact.mobile_number}</td>
                  <td className="td-cell u-min-w-160">{contact.email}</td>
                  <td className="td-cell">{contact.position}</td>
                  <td className="td-cell">{contact.in_charge_user?.name}</td>
                  <td className="td-cell">{contact.lead_source?.name}</td>
                  <td className="td-cell u-text-center">{contact.is_active_label}</td>
                  <td className="td-cell u-ellipsis u-max-w-320">{contact.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="content-section">
        <div className="content-section-title">
          配送情報
        </div>
        <div className="table-wrapper is-scrollable">
          <table className="table">
            <thead className="table-header is-sticky">
              <tr className="table-row">
                <th className="th-cell u-min-w-120 col-fixed">区分</th>
                <th className="th-cell u-min-w-240">住所</th>
                <th className="th-cell u-min-w-200">会社名</th>
                <th className="th-cell u-min-w-160">担当者名</th>
                <th className="th-cell u-min-w-160">TEL</th>
                <th className="th-cell">備考</th>
              </tr>
            </thead>
            <tbody className="table-body">
              {customer.delivery_addresses.map(delivery => (
                <tr key={delivery.id} className="table-row is-hoverable">
                  <td className="td-cell col-fixed">
                    {delivery.address_type_label}
                  </td>
                  <td className="td-cell">{delivery.postal_code} {delivery.address}</td>
                  <td className="td-cell">{delivery.company_name}</td>
                  <td className="td-cell">{delivery.contact_name}</td>
                  <td className="td-cell">{delivery.tel}</td>
                  <td className="td-cell u-ellipsis u-max-w-320">{delivery.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="content-section">
        <div className="content-section-title">
          営業履歴
        </div>
        <div className="table-wrapper is-scrollable">
          <table className="table">
            <thead className="table-header is-sticky">
              <tr className="table-row">
                <th className="th-cell u-w-136">連絡日</th>
                <th className="th-cell u-min-w-120">営業担当</th>
                <th className="th-cell u-min-w-120">連絡先</th>
                <th className="th-cell">提案内容</th>
                <th className="th-cell">反応</th>
                <th className="th-cell">備考</th>
              </tr>
            </thead>
            <tbody className="table-body">
              {customer.contacts.map(contact => (
                contact.sales_activities.map(activity => (
                  <tr key={activity.id} className="table-row is-hoverable">
                    <td className="td-cell">{activity.contact_date}</td>
                    <td className="td-cell">{activity.in_charge_user.name}</td>
                    <td className="td-cell">{contact.name}</td>
                    <td className="td-cell">{activity.proposal}</td>
                    <td className="td-cell">{activity.feedback}</td>
                    <td className="td-cell">{activity.note}</td>
                  </tr>
                ))
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </>
  );
}

Show.layout = page => <AppLayout title="取引先 詳細" children={page} />

export default Show
