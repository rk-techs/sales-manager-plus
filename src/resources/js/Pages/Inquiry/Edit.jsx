import AppLayout from '@/Layouts/AppLayout';
import { Link, useForm } from '@inertiajs/react';
import CancelButton from '../../Components/CancelButton';
import TableRow from '../../Components/Table/TableRow';
import TableHeaderCell from '../../Components/Table/TableHeaderCell';
import TableDataCell from '../../Components/Table/TableDataCell';
import FormLabel from '../../Components/Form/FormLabel';
import Input from '../../Components/Form/Input';
import Textarea from '../../Components/Form/Textarea';
import CustomSelect from '../../Components/Form/CustomSelect';

const Edit = ({ inquiry, customerContactOption, productOption, inquiryTypeOption, inChargeUserOption, inquiryStatus, inquiryLeadSource }) => {
  const { data, setData, patch, processing, errors, reset, isDirty } = useForm({
    inquiry_date: inquiry.inquiry_date,
    customer_contact_id: inquiry.customer_contact_id,
    product_id: inquiry.product_id || '',
    product_detail: inquiry.product_detail || '',
    inquiry_type_id: inquiry.inquiry_type_id || '',
    lead_source: inquiry.lead_source,
    project_scale: inquiry.project_scale || '',
    status: inquiry.status,
    subject: inquiry.subject || '',
    message: inquiry.message,
    answer: inquiry.answer || '',
    feedback: inquiry.feedback || '',
    note: inquiry.note || '',
    in_charge_user_id: inquiry.in_charge_user_id,
  });

  function submit(e) {
    e.preventDefault();
    patch(route('inquiries.update', inquiry), {
      onSuccess: () => reset(),
    });
  };

  return (
    <>
      <h1 className="content-title">問い合わせ 編集</h1>
      <div className="content-navbar">
        <button
          type="submit"
          form="inquiryCreateForm"
          className="btn btn-primary u-mr-3"
          disabled={processing}
        >
          更新する
        </button>
        <CancelButton isDirty={isDirty} route={route('inquiries.index')} />
        {processing && <span>Now Loading...</span>}
        <Link
          onBefore={() => confirm('本当に削除しますか？')}
          href={route('inquiries.destroy', inquiry)}
          method="delete"
          className="btn btn-danger u-ml-auto"
          as="button"
        >
          削除
        </Link>
      </div>
      <form id="inquiryCreateForm" onSubmit={submit}>
        <div className="table-wrapper">
          <table className="table">
          <tbody className="tbody">
              <TableRow className="is-flexible">
                <TableHeaderCell className="u-w-160">
                  <FormLabel htmlFor="inquiry_date" label="問い合わせ日" isRequired={true} />
                </TableHeaderCell>
                <TableDataCell>
                  <Input
                    id="inquiry_date"
                    type="date"
                    value={data.inquiry_date}
                    onChange={e => setData('inquiry_date', e.target.value)}
                  />
                  {errors.inquiry_date && (<div className="invalid-feedback">{errors.inquiry_date}</div>)}
                </TableDataCell>
              </TableRow>

              <TableRow className="is-flexible">
                <TableHeaderCell>
                  <FormLabel label="顧客" isRequired={false} />
                </TableHeaderCell>
                <TableDataCell>
                  <CustomSelect
                    onChange={value => setData('customer_contact_id', value)}
                    options={customerContactOption}
                    value={data.customer_contact_id}
                    valueKey="id"
                    labelKey="name"
                    isClearable={true}
                    isSearchable={true}
                    placeholder="顧客を選択..."
                  />
                  {errors.in_charge_user_id && (<div className="invalid-feedback">{errors.in_charge_user_id}</div>)}
                </TableDataCell>
              </TableRow>

              <TableRow className="is-flexible">
                <TableHeaderCell>
                  <FormLabel htmlFor="subject" label="件名" isRequired={false} />
                </TableHeaderCell>
                <TableDataCell>
                  <Input
                    id="subject"
                    type="text"
                    value={data.subject}
                    onChange={e => setData('subject', e.target.value)}
                  />
                  {errors.subject && (<div className="invalid-feedback">{errors.subject}</div>)}
                </TableDataCell>
              </TableRow>

              <TableRow className="is-flexible">
                <TableHeaderCell>
                  <FormLabel htmlFor="message" label="問い合わせ内容" isRequired={true} />
                </TableHeaderCell>
                <TableDataCell>
                  <Textarea
                    id="message"
                    value={data.message}
                    onChange={e => setData('message', e.target.value)}
                  />
                  {errors.message && (<div className="invalid-feedback">{errors.message}</div>)}
                </TableDataCell>
              </TableRow>

              <TableRow className="is-flexible">
                <TableHeaderCell>
                  <FormLabel htmlFor="answer" label="回答内容" isRequired={false} />
                </TableHeaderCell>
                <TableDataCell>
                  <Textarea
                    id="answer"
                    value={data.answer}
                    onChange={e => setData('answer', e.target.value)}
                  />
                  {errors.answer && (<div className="invalid-feedback">{errors.answer}</div>)}
                </TableDataCell>
              </TableRow>

              <TableRow className="is-flexible">
                <TableHeaderCell>
                  <FormLabel label="リード獲得元" isRequired={true} />
                </TableHeaderCell>
                <TableDataCell>
                  <CustomSelect
                    onChange={value => setData('lead_source', value)}
                    options={inquiryLeadSource}
                    value={data.lead_source}
                    valueKey="value"
                    labelKey="label"
                    isClearable={true}
                    isSearchable={true}
                    placeholder="リード獲得元を選択..."
                  />
                  {errors.lead_source && (<div className="invalid-feedback">{errors.lead_source}</div>)}
                </TableDataCell>
              </TableRow>

              <TableRow className="is-flexible">
                <TableHeaderCell>
                  <FormLabel htmlFor="project_scale" label="案件規模" isRequired={false} />
                </TableHeaderCell>
                <TableDataCell>
                  <Input
                    id="project_scale"
                    type="number"
                    value={data.project_scale}
                    onChange={e => setData('project_scale', e.target.value)}
                  />
                  {errors.project_scale && (<div className="invalid-feedback">{errors.project_scale}</div>)}
                </TableDataCell>
              </TableRow>

              <TableRow className="is-flexible">
                <TableHeaderCell>
                  <FormLabel label="ステータス" isRequired={true} />
                </TableHeaderCell>
                <TableDataCell>
                  <CustomSelect
                    onChange={value => setData('status', value)}
                    options={inquiryStatus}
                    value={data.status}
                    valueKey="value"
                    labelKey="label"
                    isClearable={true}
                    isSearchable={true}
                    placeholder="ステータスを選択..."
                  />
                  {errors.status && (<div className="invalid-feedback">{errors.status}</div>)}
                </TableDataCell>
              </TableRow>

              <TableRow className="is-flexible">
                <TableHeaderCell>
                  <FormLabel htmlFor="feedback" label="フィードバック" isRequired={false} />
                </TableHeaderCell>
                <TableDataCell>
                  <Textarea
                    id="feedback"
                    value={data.feedback}
                    onChange={e => setData('feedback', e.target.value)}
                  />
                  {errors.feedback && (<div className="invalid-feedback">{errors.feedback}</div>)}
                </TableDataCell>
              </TableRow>

              <TableRow className="is-flexible">
                <TableHeaderCell>
                  <FormLabel label="担当ユーザー" isRequired={true} />
                </TableHeaderCell>
                <TableDataCell>
                  <CustomSelect
                    onChange={value => setData('in_charge_user_id', value)}
                    options={inChargeUserOption}
                    value={data.in_charge_user_id}
                    valueKey="id"
                    labelKey="name"
                    isClearable={true}
                    isSearchable={true}
                    placeholder="担当ユーザーを選択..."
                  />
                  {errors.in_charge_user_id && (<div className="invalid-feedback">{errors.in_charge_user_id}</div>)}
                </TableDataCell>
              </TableRow>

              <TableRow className="is-flexible">
                <TableHeaderCell>
                  <FormLabel label="問い合わせ区分" isRequired={true} />
                </TableHeaderCell>
                <TableDataCell>
                  <CustomSelect
                    onChange={value => setData('inquiry_type_id', value)}
                    options={inquiryTypeOption}
                    value={data.inquiry_type_id}
                    valueKey="id"
                    labelKey="name"
                    isClearable={true}
                    isSearchable={true}
                    placeholder="問い合わせ区分を選択..."
                  />
                  {errors.in_charge_user_id && (<div className="invalid-feedback">{errors.in_charge_user_id}</div>)}
                </TableDataCell>
              </TableRow>

              <TableRow className="is-flexible">
                <TableHeaderCell>
                  <FormLabel label="対象商品" isRequired={false} />
                </TableHeaderCell>
                <TableDataCell>
                  <CustomSelect
                    onChange={value => setData('product_id', value)}
                    options={productOption}
                    value={data.product_id}
                    valueKey="id"
                    labelKey="name"
                    isClearable={true}
                    isSearchable={true}
                    placeholder="対象商品を選択..."
                  />
                  {errors.in_charge_user_id && (<div className="invalid-feedback">{errors.in_charge_user_id}</div>)}
                </TableDataCell>
              </TableRow>

              <TableRow className="is-flexible">
                <TableHeaderCell>
                  <FormLabel htmlFor="product_detail" label="商品詳細" isRequired={false} />
                </TableHeaderCell>
                <TableDataCell>
                  <Input
                    id="product_detail"
                    type="text"
                    value={data.product_detail}
                    onChange={e => setData('product_detail', e.target.value)}
                  />
                  {errors.product_detail && (<div className="invalid-feedback">{errors.product_detail}</div>)}
                </TableDataCell>
              </TableRow>

              <TableRow className="is-flexible">
                <TableHeaderCell>
                  <FormLabel htmlFor="note" label="備考" isRequired={false} />
                </TableHeaderCell>
                <TableDataCell>
                  <Textarea
                    id="note"
                    value={data.note}
                    onChange={e => setData('note', e.target.value)}
                  />
                  {errors.note && (<div className="invalid-feedback">{errors.note}</div>)}
                </TableDataCell>
              </TableRow>
            </tbody>
          </table>
        </div>
      </form>
    </>
  );
}

Edit.layout = page => <AppLayout children={page} />

export default Edit
