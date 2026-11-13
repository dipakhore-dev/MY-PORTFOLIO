import { formatRange } from '../../utils/format';
import ResourceManager from '../components/ResourceManager';

const fields = [
  { name: 'order', label: 'Display order', type: 'number', default: 0, help: 'Lower numbers appear first.' },
  { name: 'title', label: 'Degree / course', type: 'text', required: true, min: 2, max: 120 },
  { name: 'organization', label: 'School / college', type: 'text', required: true, min: 2, max: 120 },
  { name: 'location', label: 'Location', type: 'text', max: 120 },
  { name: 'startDate', label: 'Start date', type: 'date', required: true },
  { name: 'current', label: 'I currently study here', type: 'checkbox', default: false },
  { name: 'endDate', label: 'End date', type: 'date', showIf: (v) => !v.current },
  { name: 'description', label: 'Description', type: 'textarea', max: 2000, rows: 4 },
];

const columns = [
  {
    label: 'Entry',
    render: (e) => (
      <div>
        <p className="font-medium text-slate-900 dark:text-white">{e.title}</p>
        <p className="text-xs text-slate-500">{e.organization}</p>
      </div>
    ),
  },
  { label: 'Period', render: (e) => formatRange(e.startDate, e.endDate, e.current) },
];

// Defined outside the component so the list is not re-fetched on every render
const listParams = { type: 'education' };
const fixedValues = { type: 'education' };

export default function EducationPage() {
  return (
    <ResourceManager
      title="Education"
      singular="Entry"
      description="Degrees and courses shown in the Education timeline."
      resource="experience"
      params={listParams}
      fixedValues={fixedValues}
      columns={columns}
      fields={fields}
      itemLabel={(e) => e.title}
    />
  );
}
