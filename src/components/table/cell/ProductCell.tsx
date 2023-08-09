import Typography from '@/components/elements/typography/Typography';

export const ProductCell = ({
  name,
  code,
  id,
  uomName,
}: {
  name: string;
  code: string;
  id: string | number;
  uomName?: string;
}) => {
  return (
    <div className='flex flex-col' key={id}>
      <Typography variant='s4' color='primary'>
        {code}
      </Typography>
      <Typography variant='c1' className=' '>
        {name}
      </Typography>
      <Typography variant='s4' color='tertiary'>
        ({uomName})
      </Typography>
    </div>
  );
};
