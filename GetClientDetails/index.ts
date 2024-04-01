import { IInputs, IOutputs } from "./generated/ManifestTypes";

export class IpAddressPCF implements ComponentFramework.StandardControl<IInputs, IOutputs> {
    private ipAddressElement: HTMLParagraphElement;
    private _notifyOutputChanged: () => void;

    constructor() {}

    public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container: HTMLDivElement): void {
        this._notifyOutputChanged = notifyOutputChanged;
        this.ipAddressElement = document.createElement("p");
        container.appendChild(this.ipAddressElement);
        this.getIpAddress();
        notifyOutputChanged();
    }

    public updateView(context: ComponentFramework.Context<IInputs>): void {
        
    }

    public getOutputs(): IOutputs {
        return {
            IPAddress: this.ipAddressElement.textContent ? this.ipAddressElement.textContent : "" // Assuming EmployeeName is the name of your output property
        };
    }

    public destroy(): void {}

    private getIpAddress(): void {
        fetch("https://api.ipify.org?format=json")
            .then(response => response.json())
            .then(data => {
                this.ipAddressElement.textContent = data.ip;
                this._notifyOutputChanged(); // Notify the framework that outputs have changed
            })
            .catch(error => {
                console.error("Error fetching IP address:", error);
            });
    }
}