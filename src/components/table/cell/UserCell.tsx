import Typography from "@/components/Typography";

export const UserFirstNameLastNameCell = ({
  first_name,
  last_name,
}: {
  first_name: string;
  last_name: string;
}) => {
  return (
    <div className="flex flex-col" key={`${first_name}${last_name}`}>
      <Typography variant="s4" color="primary">
        {first_name}
      </Typography>
      <Typography variant="c1" className=" ">
        {last_name}
      </Typography>
    </div>
  );
};
