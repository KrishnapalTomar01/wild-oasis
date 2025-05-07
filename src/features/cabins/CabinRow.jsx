import styled from "styled-components";
import PropTypes from "prop-types";

import { formatCurrency } from "../../utils/helpers";
import CreateCabinForm from "./CreateCabinForm";
import useDeleteCabin from "./useDeleteCabin";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import useCreateCabin from "./useCreateCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
  const {
    discount,
    regularPrice,
    maxCapacity,
    image,
    name,
    id: cabinId,
    description,
  } = cabin;
  const { isDeleting, deleteCabinMutate } = useDeleteCabin();
  const { isCreating, createCabin } = useCreateCabin();

  function handleDuplicate() {
    createCabin({
      name: `Copy of ${name}`,
      discount,
      regularPrice,
      maxCapacity,
      image,
      description,
    });
  }

  return (
    <>
      <TableRow role="row">
        <Img src={image} alt={name} />
        <Cabin>{name}</Cabin>
        <div>Fits up to {maxCapacity} guests</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        {discount ? (
          <Discount>{formatCurrency(discount)}</Discount>
        ) : (
          <span>&mdash;</span>
        )}
        <div>
          <button onClick={handleDuplicate} disabled={isCreating}>
            <HiSquare2Stack />
          </button>
          <Modal>
            <Modal.Open opens="edit-cabin">
              <button>
                <HiPencil />
              </button>
            </Modal.Open>
            <Modal.Window name="edit-cabin">
              <CreateCabinForm cabinToEdit={cabin} />
            </Modal.Window>

            <Modal.Open opens="delete-cabin">
              <button disabled={isDeleting}>
                <HiTrash />
              </button>
            </Modal.Open>
            <Modal.Window name="delete-cabin">
              <ConfirmDelete
                resourceName="cabin"
                disabled={isDeleting}
                onConfirm={() => deleteCabinMutate(cabinId)}
              />
            </Modal.Window>
          </Modal>
        </div>
      </TableRow>
    </>
  );
}

CabinRow.propTypes = {
  cabin: PropTypes.shape({
    discount: PropTypes.number.isRequired,
    regularPrice: PropTypes.number.isRequired,
    maxCapacity: PropTypes.number.isRequired,
    image: PropTypes.string,
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    description: PropTypes.string,
  }).isRequired,
};

export default CabinRow;
