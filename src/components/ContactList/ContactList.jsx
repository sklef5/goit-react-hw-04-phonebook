import PropTypes from 'prop-types';
import { Contact, Button, List } from './ContactList.styled';

const ContactList = (props) => {

    const { contacts, onDelete } = props;
    return (
        <List>
            {contacts.map(({ name, number, id }) => {
                return (
                    <Contact key={id}>
                        <span>
                            {name}: {number}
                        </span>
                        <Button type="button" onClick={() => onDelete(id)}>
                            Delete
                        </Button>
                    </Contact>
                );
            })}
        </List>
    );
}

export default ContactList;

ContactList.propTypes = {
    contacts: PropTypes.array.isRequired,
    onDelete: PropTypes.func.isRequired,
};