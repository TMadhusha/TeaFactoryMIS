package com.miniProject.TeaFactoryMIS.Exception;

public class EpfEtfNotFoundException extends RuntimeException {
    public EpfEtfNotFoundException(Long epf_etfId){
        super("Could Not Found the EPF or ETF Id: "+epf_etfId);
    }

}
