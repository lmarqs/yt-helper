import React, { useCallback, DependencyList, Component, ChangeEventHandler, FormEventHandler } from "react";

interface FieldValues {
  url: string;
}

type OnSubmit = (values: FieldValues) => void;

interface Props {
  onSubmit?: OnSubmit;
}

interface State {
  url: string,
  isSubmitting: boolean;
}

export class Form extends Component<Props, State> {
  public state: State = {
    url: "",
    isSubmitting: false,
  }

  private handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault();
    
    const { url } = this.state;
    const { onSubmit = () => undefined } = this.props;

    this.setState({ isSubmitting: true });

    try {
      await onSubmit({ url });
      this.setState({ url: "" });
    } catch (e) {
      alert(e?.message ?? "Erro");
    } finally {
      this.setState({ isSubmitting: false });
    }
  }

  private handleUrlChange: ChangeEventHandler<HTMLInputElement> = async (e) => {
    this.setState({ url: e.target.value })
  }

  public render() {
    const { url, isSubmitting } = this.state;

    return (
      <form
        autoComplete="off"
        className="form-inline my-2 my-lg-0"
        onSubmit={this.handleSubmit}
      >
        <input
          aria-label="Video URL"
          className="col-12 col-md-8 form-control mr-md-2"
          name="url"
          onChange={this.handleUrlChange}
          placeholder="Video URL"
          readOnly={isSubmitting}
          required
          type="url"
          value={url}
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
}


interface InnerFormProps {
  onSubmit: OnSubmit,
  isSubmitting: boolean,
}

export function useOnSubmitCallback(callback: OnSubmit, dependencies: DependencyList = []): OnSubmit {
  return useCallback<OnSubmit>(callback, dependencies);
}
