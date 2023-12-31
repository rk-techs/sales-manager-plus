import { useState, useEffect } from 'react';
import { Link, useForm, usePage } from '@inertiajs/react';

import MenuItem from '@mui/material/MenuItem';

import AppLayout from '@/Layouts/AppLayout';
import Alert from '@/Components/Alert';
import CustomSelect from '@/Components/Form/CustomSelect';
import DropdownMenu from '@/Components/DropdownMenu';
import Pagination from '@/Components/Pagination';
import KeywordSearchForm from '@/Components/KeywordSearchForm';
import InquiryTable from './Partials/InquiryTable';
import FormLabel from '@/Components/Form/FormLabel';
import Input from '@/Components/Form/Input';
import DateInput from '@/Components/Form/DateInput';
import ToggleFilterButton from '@/Components/ToggleFilterButton';

const Index = ({ inquiries, productOptions, inChargeUserOptions, inquiryTypeOptions, inquiryStatusOptions }) => {
  const urlParams = route().params;
  const { flash } = usePage().props;
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    if (Object.keys(urlParams).length > 0) {
      setIsFilterOpen(true);
    }
  }, []);

  const { data, setData, get, errors } = useForm({
    keyword: urlParams.keyword || '',
    inquiry_id: urlParams.inquiry_id || '',
    customer_info: urlParams.customer_info || '',
    start_date: urlParams.start_date || '',
    end_date: urlParams.end_date || '',
    in_charge_user_id: urlParams.in_charge_user_id || '',
    status: urlParams.status || '',
    inquiry_type_id: urlParams.inquiry_type_id || '',
    product_id: urlParams.product_id || '',
  });

  function resetSearchInputs() {
    setData({
      ...data,
      keyword: '',
      inquiry_id: '',
      customer_info: '',
      start_date: '',
      end_date: '',
      in_charge_user_id: '',
      status: '',
      inquiry_type_id: '',
      product_id: '',
    })
  }

  function submit(e) {
    e.preventDefault();
    get(route('inquiries.index'), {
      preserveState: true,
    });
  };

  return (
    <>
      <h1 className="content-title">問い合わせ 一覧</h1>
      <div className="content-navbar">
        <Link
          href={route('inquiries.create')}
          className="btn btn-primary u-mr-3"
        >
          新規登録
        </Link>

        <DropdownMenu
          buttonLabel="設定"
          buttonClassName="u-mr-3"
        >
          <Link href={route('inquiry-types.index')}>
            <MenuItem>
              区分登録
            </MenuItem>
          </Link>
        </DropdownMenu>


        <KeywordSearchForm
          placeholder="件名、内容で検索"
          data={data}
          setData={setData}
          errors={errors}
          submit={submit}
        />

        <ToggleFilterButton isFilterOpen={isFilterOpen} setIsFilterOpen={setIsFilterOpen} />

        <div className="record-count">
          {inquiries.total}件
        </div>
        <Pagination paginator={inquiries} />
      </div>

      <form onSubmit={submit}>
        <div className={`filter-section ${isFilterOpen ? 'show' : ''}`}>
          <div className="filter-form-body">
            <div className="u-mr-2">
              <FormLabel htmlFor="inquiry_id" label="ID" />
              <Input
                id="inquiry_id"
                type="number"
                value={data.inquiry_id}
                onChange={e => setData('inquiry_id', e.target.value)}
                error={errors.inquiry_id}
                className="u-max-w-80"
              />
            </div>

            <div className="u-mr-2">
              <FormLabel htmlFor="start_date" label="問い合わせ日" />
              <div className="u-flex">
                <DateInput
                  id="start_date"
                  value={data.start_date}
                  onChange={e => setData('start_date', e.target.value)}
                  error={errors.start_date}
                />
                <span className="u-mx-1">~</span>
                <DateInput
                  id="end_date"
                  value={data.end_date}
                  onChange={e => setData('end_date', e.target.value)}
                  error={errors.end_date}
                />
              </div>
            </div>

            <div className="u-mr-2">
              <FormLabel htmlFor="customer_info" label="顧客情報" />
              <Input
                id="customer_info"
                type="text"
                value={data.customer_info}
                onChange={e => setData('customer_info', e.target.value)}
                error={errors.customer_info}
                className="u-max-w-200"
              />
            </div>

            <div className="u-mr-2 u-min-w-200">
              <FormLabel label="対象商品" />
              <CustomSelect
                onChange={value => setData('product_id', value)}
                options={productOptions}
                value={data.product_id}
                valueKey="id"
                labelKey="name"
                isClearable={true}
                isSearchable={true}
                placeholder="..."
                error={errors.product_id}
              />
            </div>

            <div className="u-mr-2 u-min-w-200">
              <FormLabel label="担当者" />
              <CustomSelect
                onChange={value => setData('in_charge_user_id', value)}
                options={inChargeUserOptions}
                value={data.in_charge_user_id}
                valueKey="id"
                labelKey="name"
                isClearable={true}
                isSearchable={true}
                placeholder="..."
                error={errors.in_charge_user_id}
              />
            </div>

            <div className="u-mr-2 u-min-w-160">
              <FormLabel label="ステータス" />
              <CustomSelect
                onChange={value => setData('status', value)}
                options={inquiryStatusOptions}
                value={data.status}
                valueKey="value"
                labelKey="label"
                isClearable={true}
                isSearchable={true}
                placeholder="..."
                error={errors.status}
              />
            </div>

            <div className="u-mr-2 u-min-w-160">
              <FormLabel label="区分" />
              <CustomSelect
                onChange={value => setData('inquiry_type_id', value)}
                options={inquiryTypeOptions}
                value={data.inquiry_type_id}
                valueKey="id"
                labelKey="name"
                isClearable={true}
                isSearchable={true}
                placeholder="..."
                error={errors.inquiry_type_id}
              />
            </div>
          </div>
          <div className="filter-form-footer">
            <button className="btn btn-primary u-mr-3">
              検索
            </button>
            <Link
              href={route('inquiries.index')}
              className="btn btn-secondary"
              preserveState={true}
              onSuccess={resetSearchInputs}
            >
              クリア
            </Link>
          </div>
        </div>
      </form>

      <Alert type="success" message={flash.message} />

      <InquiryTable inquiries={inquiries.data} />
    </>
  );
}

Index.layout = page => <AppLayout title="問い合わせ 一覧" children={page} />

export default Index
