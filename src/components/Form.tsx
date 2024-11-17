import Button from './Button.tsx';

const Form = () => {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        console.log('Sub');
      }}
    >
      <div className={'mb-3'}>
        <label htmlFor="name" className="text-white">
          Name
        </label>
        <input id="name" type={'text'} className={'w-full'} />
      </div>
      <div className={'mb-3'}>
        <label htmlFor="name" className="text-white">
          Age
        </label>
        <input id="age" type={'number'} className={'w-full'} />
      </div>
      <Button type={'submit'}>Submit</Button>
    </form>
  );
};

export default Form;
