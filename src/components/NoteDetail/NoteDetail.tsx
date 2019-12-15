import * as React from 'react';
import './NoteDetail.scss';
import { ListService, ListItem } from '../../data/ListService'
import { RouteComponentProps } from 'react-router-dom'

interface MatchParams {
	noteId: string;
}

interface Props extends RouteComponentProps<MatchParams> {}

export const NoteDetail: React.FC<Props> = ( { match } ) => {
	
	const [note, setNote] = React.useState<ListItem>();
	const [title, setTitle] = React.useState<string>();
	const [items, setItems] = React.useState<string[]>();

	React.useEffect(() => {
		note !== undefined && setItems(note.items);
		note !== undefined && setTitle(note.title);
	}, [note])

	React.useEffect(() => {
		ListService.getItem(+match.params.noteId).then(setNote);
	}, [match.params.noteId])
	
	React.useEffect(() => {
		items !== undefined && ListService.updateNoteItems(+match.params.noteId, items);
	}, [items])


	const onInputTextEnter = (event: React.KeyboardEvent) => {
		const input = event.target
		const partner = document.getElementById('new-input-text')
		if (event.key === 'Enter' && input && input instanceof HTMLInputElement && items && partner instanceof HTMLElement) {
			setItems([...items, input.value])
			togglePartners(partner)
		}
	}
	
	const deleteItem = (event: React.MouseEvent) => {
		const button = event.target;
		if (button instanceof HTMLButtonElement){	
			const deleteIndex = button.dataset.itemIndex === undefined ? -1 : +button.dataset.itemIndex;
			if (items !== undefined && items.length > deleteIndex && deleteIndex !== -1){
				items.splice(deleteIndex, 1);	
				setItems([...items]);
			}
		}
	}

	const togglePartners = (primaryElement: HTMLElement) => {
		if (primaryElement.dataset.partnerId) {
			document.getElementById(primaryElement.dataset.partnerId)?.classList.toggle('hidden')
			primaryElement.classList.toggle('hidden')
		}
	}

	const toggleOnClick = (event: React.MouseEvent) => {
		const element = event.target;
		if (element instanceof HTMLElement){	
			togglePartners(element)	
		}
	}

	const updateItem = (event: React.KeyboardEvent) => {
		const input = event.target;
		const key = event.key;
		if (key === 'Enter' && input instanceof HTMLInputElement && input.dataset.itemId && items){
			items[+input.dataset.itemId] = input.value
			setItems([...items])
			togglePartners(input)
		}
	}
	
	return (
		<div className="NoteDetail">
			<h3>{ title }</h3>
			<ul>
				{items?.map((item, index) => {
				return (<div key={ index } className='note-item-list'>
									<li>
										<span onClick={ toggleOnClick } id={ `${index}Value` } data-partner-id={ `${index}Index` }>{item}</span>
										<input id={ `${index}Index` } className='hidden' type='text' onKeyDown={ updateItem } 
											data-partner-id={`${index}Value`} data-item-id={ index }/>
									</li>
									<button id="delete-button" onClick={ deleteItem } data-item-index={ index }>x</button>
					 		 </div>)
				})}
				<button id='new-button' onClick={ toggleOnClick } data-partner-id='new-input-text' >New</button>
				<li id='new-input-text' className='hidden' data-partner-id='new-button'><input type='text' onKeyDown={ onInputTextEnter } /></li>
			</ul>
	</div>
	)
};

NoteDetail.displayName = 'NoteDetail';
