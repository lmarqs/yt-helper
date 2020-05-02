import React, { useCallback, DependencyList, Component, FunctionComponent } from "react";
import { useForm } from 'react-hook-form';

interface FieldValues {
  url: string;
}

type OnSubmit = (values: FieldValues) => void;

interface Props {
  onSubmit?: OnSubmit;
}

interface State {
  isSubmitting: boolean;
}

export class Form extends Component<Props, State> {
  public state: State = {
    isSubmitting: false,
  }

  private handleSubmit: OnSubmit = async (...args) => {
    const { onSubmit = () => undefined } = this.props;

    this.setState({ isSubmitting: true });

    try {
      await onSubmit(...args);
    } catch (e) {
      alert(e?.message ?? "Erro");
    } finally {
      this.setState({ isSubmitting: false });
    }
  }

  public render() {
    const { isSubmitting } = this.state;
    return <InnerForm isSubmitting={isSubmitting} onSubmit={this.handleSubmit} />
  }
}


interface InnerFormProps {
  onSubmit: OnSubmit,
  isSubmitting: boolean,
}

const InnerForm: FunctionComponent<InnerFormProps> = ({ onSubmit, isSubmitting }) => {
  const { register, handleSubmit } = useForm<FieldValues>();

  return (
    <form
      autoComplete="off"
      className="form-inline my-2 my-lg-0"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        aria-label="Video URL"
        className="col-12 col-md-8 form-control mr-md-2"
        name="url"
        placeholder="Video URL"
        readOnly={isSubmitting}
        ref={register}
        required
        type="url"
      />
      <button
        className="btn btn-outline-success my-2"
        disabled={isSubmitting}
        type="submit"
      >
        Adicionar
      </button>
    </form>
  )
}

export function useOnSubmitCallback(callback: OnSubmit, dependencies: DependencyList = []): OnSubmit {
  return useCallback<OnSubmit>(callback, dependencies);
}
