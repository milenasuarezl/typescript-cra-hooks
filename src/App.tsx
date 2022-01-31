import { ReactElement, ReactNode, useState } from 'react';
import './App.css';

// Conventional props

/**
 * Basic function
 * function Heading ({ title }: {title: string}){
  return <h3>{title}</h3>
}*/

// other way to write
// const HeadingFC: React.FC<{ title: string}> = ({ title }) => <h3>{title}</h3>

const Heading = ({ title }: { title: string}) => {
  return <h3>{title}</h3>
}

const HeadingWithContent = ({ children }: { children: ReactNode}): ReactElement | null => {
  return <p>{children}</p>
}

// Default props
const defaultContainerProps = {
  heading: <strong> Default props</strong>
}

type ContainerProps = { children: ReactNode } & typeof defaultContainerProps

const Container = ({ 
  heading, 
  children, 
}: ContainerProps): ReactElement | null => {
  return <div>
          <h3>{heading}</h3>
          <p>{children}</p>
        </div>
}

Container.defaultProps = defaultContainerProps;

// Functional props
const TextWithNumber = ({
  header,
  children
} : { header?: (num: number) => ReactNode,
     children: (num : number) => ReactNode}) => {
  const [state, setState] = useState<number>(1);

  return (
    <>
      { header && <h3>{header?.(state)}</h3> }
      <div style={{marginBottom: "1rem"}}>
        {children(state)}
      </div>
      <div>
        <button onClick={() => setState(state + 1) }>Add</button>
      </div>
    </>
  )
} 

// List
function FunctionList<ListItem> ({
  items, 
  render,
  } : { 
    items: ListItem[], 
    render: (item: ListItem) => ReactNode
  }) {
  return <></>
}

// Extends trick  <ListItem extends unknown>
const List = <ListItem,>({
  items, 
  render,
} : { 
  items: ListItem[], 
  render: (item: ListItem) => ReactNode 
}) => {
  return (
    <ul>
      { items.map((item, index) => (
        <li key={index}>{render(item)}</li>
      ))}
    </ul>
  )
}


function App() {
  return (
    <div>
     <Heading title={'Conventional Props'}/>
     <HeadingWithContent>
       Children as a prop
     </HeadingWithContent>
     
     <Container>
       Children default prop
     </Container>

     <Heading title={'Functional Props'}/>
     <TextWithNumber>
       {(num: number) => <div>The number is {num}</div>}
      </TextWithNumber>

      <Heading title={'List <Generics> Props'}/>
      <List 
        items={['Sofia', 'Julian', 'Laura']} 
        render={(item: string) => <span>{item.toLowerCase()}</span>}
      ></List>
    </div>
  );
}

export default App;
