import { formatRange } from '../../utils/format';
import ResourceManager from '../components/ResourceManager';

const fields = [
  {
    name: 'type',
    label: 'Type',
    type: 'select',
    options: [
      { value: 'work', label: 'Work' },
      { value: 'internship', label: 'Internship' },
    ],
  },
  { name: 'order', label: 'Display order', type: 'number', default: 0, help: 'Lower numbers appear first.' },
  { name: 'title', label: 'Job title / role', type: 'text', required: true, min: 2, max: 120 },
  { name: 'organization', label: 'Company', type: 'text', required: true, min: 2, max: 120 },
  { name: 'location', label: 'Location', type: 'text', max: 120 },
  { name: 'startDate', label: 'Start date', type: 'date', required: true },
  { name: 'current', label: 'I currently work here', type: 'checkbox', default: false },
  { name: 'endDate', label: 'End date', type: 'date', showIf: (v) => !v.current },
  { name: 'description', label: 'Description', type: 'textarea', max: 2000, rows: 4 },
];

const isExperience = (entry) => entry.type !== 'education';

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
  { label: 'Type', className: 'hidden sm:table-cell', render: (e) => <span className="tag capitalize">{e.type}</span> },
  { label: 'Period', render: (e) => formatRange(e.startDate, e.endDate, e.current) },
];

export default function ExperiencePage() {
  return (
    <ResourceManager
      title="Experience"
      singular="Entry"
      description="Work and internship history shown in the Experience timeline."
      resource="experience"
      filter={isExperience}
      columns={columns}
      fields={fields}
      itemLabel={(e) => e.title}
    />
  );
}
